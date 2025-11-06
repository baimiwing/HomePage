import { useState} from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState('');
  
    const addTodo = () => {
      if (inputText.trim()) {
        const newTodo: Todo = {
          id: Date.now(),
          text: inputText.trim(),
          completed: false
        };
        setTodos([...todos, newTodo]);
        setInputText('');
      }
    };
  
    const toggleTodo = (id: number) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    };
  
    const deleteTodo = (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addTodo();
    };
  
    return (
      <div style={{ maxWidth: '400px', margin: '20px auto' }}>    