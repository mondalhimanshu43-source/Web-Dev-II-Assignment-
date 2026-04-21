function StudentRow({ student, updateScore }) {
  const isPass = student.score >= 40;

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td>
        <input
          type="number"
          value={student.score}
          onChange={(e) => updateScore(student.id, e.target.value)}
          min="0"
          max="100"
        />
      </td>
      <td className={isPass ? "pass" : "fail"}>
        {isPass ? "Pass" : "Fail"}
      </td>
    </tr>
  );
}

export default StudentRow;