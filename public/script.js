const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const message = document.getElementById('message');
const refreshBtn = document.getElementById('refreshBtn');

const API_URL = '/api/students';

async function fetchStudents() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    studentList.innerHTML = '';

    if (!result.data || result.data.length === 0) {
      studentList.innerHTML = '<p>No students found. Add a student first.</p>';
      return;
    }

    result.data.forEach((student) => {
      const div = document.createElement('div');
      div.className = 'student-item';
      div.innerHTML = `
        <h3>${student.name}</h3>
        <p>Email: ${student.email}</p>
        <p>Age: ${student.age}</p>
        <div class="student-actions">
          <button class="delete-btn" onclick="deleteStudent('${student._id}')">Delete</button>
        </div>
      `;
      studentList.appendChild(div);
    });
  } catch (error) {
    studentList.innerHTML = '<p>Failed to fetch students. Check server and MongoDB.</p>';
  }
}

studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const studentData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: Number(document.getElementById('age').value),
  };

  try {
    const response = await fetch('/add-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });

    const result = await response.json();

    if (result.success) {
      message.style.color = 'green';
      message.textContent = 'Student added successfully!';
      studentForm.reset();
      fetchStudents();
    } else {
      message.style.color = 'red';
      message.textContent = result.message || 'Failed to add student.';
    }
  } catch (error) {
    message.style.color = 'red';
    message.textContent = 'Server error. Please check backend and MongoDB.';
  }
});

async function deleteStudent(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  } catch (error) {
    alert('Failed to delete student.');
  }
}

refreshBtn.addEventListener('click', fetchStudents);
fetchStudents();
