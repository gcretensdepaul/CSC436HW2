import Todo from './Todo';

export default function TodoList ({todos = []}) {
 return (
    <div>
        {todos.map((t) => <Todo {...t} key={t.id} />)}
    </div> 
  );
}