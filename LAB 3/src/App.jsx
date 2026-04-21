import { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/studentTable";
import AddStudentForm from "./components/AddStudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 78 },
    { id: 2, name: "Riya", score: 35 },
    { id: 3, name: "Karan", score: 50 }
  ]);

  function updateScore(id, newScore) {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, score: Number(newScore) }
          : student
      )
    );
  }

  function addStudent(name, score) {
    const newStudent = {
      id: Date.now(),
      name: name,
      score: Number(score)
    };

    setStudents([...students, newStudent]);
  }

  return (
    <div className="app">
      <Header />
      <AddStudentForm addStudent={addStudent} />
      <StudentTable students={students} updateScore={updateScore} />
    </div>
  );
}

export default App;