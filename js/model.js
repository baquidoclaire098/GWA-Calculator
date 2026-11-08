
const STORAGE_KEY = 'gwa-calculator-data';

// Main application state
export const state = {
  subjects: []
};

// Load saved subjects from localStorage
const loadData = function () {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData.subjects)) {
        state.subjects = parsedData.subjects;
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }
};

// Save subjects to localStorage
const saveData = function () {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
};

// Add a new subject
export const addSubject = function (subjectData) {
  const newSubject = {
    id: Date.now().toString(),
    subject: subjectData.subject,
    grade: subjectData.grade,
    units: subjectData.units
  };

  state.subjects.push(newSubject);

  saveData();
};

// Edit an existing subject
export const editSubject = function (id, updatedData) {
  const subject = state.subjects.find(
    subject => subject.id === id
  );

  if (!subject) return;

  subject.subject = updatedData.subject;
  subject.grade = updatedData.grade;
  subject.units = updatedData.units;

  saveData();
};

// Delete a subject
export const deleteSubject = function (id) {
  state.subjects = state.subjects.filter(
    subject => subject.id !== id
  );

  saveData();
};

// Calculate GWA and summary
export const getSummary = function () {
  const totalSubjects = state.subjects.length;

  const totalUnits = state.subjects.reduce(
    (total, subject) => total + subject.units,
    0
  );

  const totalWeightedGrades = state.subjects.reduce(
    (total, subject) =>
      total + subject.grade * subject.units,
    0
  );

  const gwa = totalUnits > 0
    ? totalWeightedGrades / totalUnits
    : 0;

  return {
    gwa,
    totalSubjects,
    totalUnits
  };
};

// Load saved data when the application starts
loadData();
//botbot