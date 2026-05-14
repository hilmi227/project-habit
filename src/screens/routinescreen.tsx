import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = "todos";

// ─── TodoItem ─────────────────────────────────────────────────────────────────

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onLongPress: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onLongPress }: TodoItemProps) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onToggle(todo.id)}
      onLongPress={() => onLongPress(todo.id)}
      delayLongPress={400}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, todo.done && styles.checkboxDone]}>
        {todo.done && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.itemText, todo.done && styles.itemTextDone]}>
        {todo.text}
      </Text>
    </TouchableOpacity>
  );
};

// ─── ActionModal ──────────────────────────────────────────────────────────────

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ActionModal = ({ visible, onClose, onDelete, onEdit }: ActionModalProps) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.actionSheet}>
        <View style={styles.handle} />
        <Text style={styles.actionTitle}>Ne yapmak istiyorsun?</Text>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.editIcon}>✏️</Text>
          <Text style={styles.editBtnText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteIcon}>🗑</Text>
          <Text style={styles.deleteBtnText}>Sil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelBtnText}>İptal</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
);

// ─── EditModal ────────────────────────────────────────────────────────────────

interface EditModalProps {
  visible: boolean;
  value: string;
  onChange: (text: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const EditModal = ({ visible, value, onChange, onSave, onClose }: EditModalProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.overlay} onPress={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.editSheet}>
          <Text style={styles.editTitle}>Görevi Düzenle</Text>
          <TextInput
            style={styles.editInput}
            value={value}
            onChangeText={onChange}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={onSave}
          />
          <View style={styles.editRow}>
            <TouchableOpacity style={styles.editCancelBtn} onPress={onClose}>
              <Text style={styles.editCancelText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editSaveBtn} onPress={onSave}>
              <Text style={styles.editSaveText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  </Modal>
);

// ─── AddModal ─────────────────────────────────────────────────────────────────

interface AddModalProps {
  visible: boolean;
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
  onClose: () => void;
}

const AddModal = ({ visible, value, onChange, onAdd, onClose }: AddModalProps) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <Pressable style={styles.overlay} onPress={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.addSheet}>
          <View style={styles.handle} />
          <Text style={styles.addTitle}>Yeni Görev</Text>
          <TextInput
            style={styles.addInput}
            placeholder="Görev yaz..."
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={onAdd}
          />
          <TouchableOpacity
            style={[styles.addConfirmBtn, value.trim() === "" && styles.addConfirmBtnDisabled]}
            onPress={onAdd}
            disabled={value.trim() === ""}
          >
            <Text style={styles.addConfirmText}>Ekle</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  </Modal>
);

// ─── ANA EKRAN ────────────────────────────────────────────────────────────────

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editText, setEditText] = useState("");
  const [addText, setAddText] = useState("");

  // Uygulama açılınca verileri yükle
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Veriler yüklenemedi:", e);
      }
    };
    loadTodos();
  }, []);

  // todos değişince kaydet
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (e) {
        console.error("Veriler kaydedilemedi:", e);
      }
    };
    saveTodos();
  }, [todos]);

  const addTodo = useCallback(() => {
    if (addText.trim() === "") return;
    const yeniTodo: Todo = {
      id: Date.now().toString(),
      text: addText.trim(),
      done: false,
    };
    setTodos((prev) => [...prev, yeniTodo]);
    setAddText("");
    setAddModalVisible(false);
  }, [addText]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const handleLongPress = useCallback((id: string) => {
    setSelectedId(id);
    setActionModalVisible(true);
  }, []);

  const deleteTodo = useCallback(() => {
    setTodos((prev) => prev.filter((t) => t.id !== selectedId));
    setActionModalVisible(false);
    setSelectedId(null);
  }, [selectedId]);

  const openEdit = useCallback(() => {
    const secili = todos.find((t) => t.id === selectedId);
    if (secili) setEditText(secili.text);
    setActionModalVisible(false);
    setEditModalVisible(true);
  }, [todos, selectedId]);

  const saveEdit = useCallback(() => {
    if (editText.trim() === "") return;
    setTodos((prev) =>
      prev.map((t) => (t.id === selectedId ? { ...t, text: editText.trim() } : t))
    );
    setEditModalVisible(false);
    setSelectedId(null);
    setEditText("");
  }, [editText, selectedId]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Todo>) => (
      <TodoItem todo={item} onToggle={toggleTodo} onLongPress={handleLongPress} />
    ),
    [toggleTodo, handleLongPress]
  );

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f0" />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Görevler</Text>
          <Text style={styles.counter}>{doneCount}/{todos.length} tamamlandı</Text>
        </View>
        <TouchableOpacity style={styles.newBtn} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.newBtnText}>+ Yeni Görev</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
          overrideItemLayout={(layout) => {
    layout.span = 64;
  }}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyText}>Henüz görev yok.</Text>
            <Text style={styles.emptySubText}>Sağ üstten ekleyebilirsin.</Text>
          </View>
        }
      />

      <ActionModal
        visible={actionModalVisible}
        onClose={() => { setActionModalVisible(false); setSelectedId(null); }}
        onDelete={deleteTodo}
        onEdit={openEdit}
      />

      <EditModal
        visible={editModalVisible}
        value={editText}
        onChange={setEditText}
        onSave={saveEdit}
        onClose={() => { setEditModalVisible(false); setSelectedId(null); setEditText(""); }}
      />

      <AddModal
        visible={addModalVisible}
        value={addText}
        onChange={setAddText}
        onAdd={addTodo}
        onClose={() => { setAddModalVisible(false); setAddText(""); }}
      />
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f0" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#1a1a1a" },
  counter: { fontSize: 13, color: "#888", marginTop: 2 },
  newBtn: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  newBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: { backgroundColor: "#4ade80", borderColor: "#4ade80" },
  checkmark: { color: "#fff", fontSize: 13, fontWeight: "700" },
  itemText: { fontSize: 15, color: "#1a1a1a", flex: 1 },
  itemTextDone: { textDecorationLine: "line-through", color: "#aaa" },

  emptyContainer: { alignItems: "center", marginTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: "#888", fontWeight: "500" },
  emptySubText: { fontSize: 13, color: "#bbb", marginTop: 4 },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  actionSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 6,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0eb",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  editIcon: { fontSize: 18 },
  editBtnText: { fontSize: 15, color: "#1a1a1a", fontWeight: "500" },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  deleteIcon: { fontSize: 18 },
  deleteBtnText: { fontSize: 15, color: "#dc2626", fontWeight: "500" },
  cancelBtn: { padding: 14, alignItems: "center" },
  cancelBtnText: { fontSize: 15, color: "#888" },

  editSheet: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 16,
    gap: 14,
  },
  editTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
  editInput: {
    backgroundColor: "#f0f0eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1a1a1a",
  },
  editRow: { flexDirection: "row", gap: 10 },
  editCancelBtn: {
    flex: 1,
    backgroundColor: "#f0f0eb",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  editCancelText: { fontSize: 15, color: "#888", fontWeight: "500" },
  editSaveBtn: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  editSaveText: { fontSize: 15, color: "#fff", fontWeight: "600" },

  addSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 14,
  },
  addTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
  addInput: {
    backgroundColor: "#f0f0eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1a1a1a",
  },
  addConfirmBtn: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  addConfirmBtnDisabled: { backgroundColor: "#ccc" },
  addConfirmText: { fontSize: 15, color: "#fff", fontWeight: "600" },
});