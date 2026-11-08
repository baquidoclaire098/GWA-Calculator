import * as model from './model.js';

import subjectFormView from './views/SubjectFormView.js';
import subjectListView from './views/SubjectListView.js';
import summaryView from './views/SummaryView.js';

// Track the subject currently being edited
let editingSubjectId = null;

// Render all application data
const renderApp = function () {
  subjectListView.render(model.state.subjects);
  summaryView.render(model.getSummary());
};

// Validate subject information
const validateSubject = function (data) {
  if (!data.subject.trim()) {
    return 'Please enter a subject name.';
  }

  if (
    !Number.isFinite(data.grade) ||
    data.grade < 1 ||
    data.grade > 5
  ) {
    return 'Grade must be between 1.00 and 5.00.';
  }

  if (
    !Number.isFinite(data.units) ||
    data.units < 0.5 ||
    data.units > 6 ||
    !Number.isInteger(data.units * 2)
  ) {
    return 'Units must be between 0.5 and 6, using 0.5 increments.';
  }

  return '';
};

// Handle adding or updating a subject
const controlAddSubject = function (data) {
  const error = validateSubject(data);

  if (error) {
    subjectFormView.renderError(error);
    return;
  }

  if (editingSubjectId) {
    model.editSubject(editingSubjectId, data);
    editingSubjectId = null;
  } else {
    model.addSubject(data);
  }

  subjectFormView.resetForm();

  renderApp();
};

// Handle cancelling an edit
const controlCancelEdit = function () {
  editingSubjectId = null;

  subjectFormView.resetForm();
};

// Store the ID of the subject to be deleted
let deletingSubjectId = null;

// Show delete confirmation modal
const controlDeleteSubject = function (id) {
  const subject = model.state.subjects.find(
    subject => subject.id === id
  );

  if (!subject) return;

  deletingSubjectId = id;

  document.querySelector('#delete-subject-name').textContent =
    subject.subject;

  document.querySelector('#delete-modal').hidden = false;
};

// Close delete confirmation modal
const closeDeleteModal = function () {
  deletingSubjectId = null;

  document.querySelector('#delete-modal').hidden = true;
};

// Confirm subject deletion
const controlConfirmDelete = function () {
  if (!deletingSubjectId) return;

  const id = deletingSubjectId;

  model.deleteSubject(id);

  if (editingSubjectId === id) {
    controlCancelEdit();
  }

  closeDeleteModal();

  renderApp();
};

// Handle editing a subject
const controlEditSubject = function (id) {
  const subject = model.state.subjects.find(
    subject => subject.id === id
  );

  if (!subject) return;

  editingSubjectId = id;

  subjectFormView.renderEdit(subject);

  document.querySelector('.form-section').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

// Initialize the application
const init = function () {
  subjectFormView.render({});

  subjectFormView.addHandlerAddSubject(controlAddSubject);

  subjectFormView.addHandlerCancelEdit(controlCancelEdit);

  subjectListView.addHandlerDelete(controlDeleteSubject);

  subjectListView.addHandlerEdit(controlEditSubject);

  // Delete modal event handlers
document.querySelector('#cancel-delete')
  .addEventListener('click', closeDeleteModal);

document.querySelector('#confirm-delete')
  .addEventListener('click', controlConfirmDelete);

document.querySelector('#delete-modal')
  .addEventListener('click', function (event) {
    if (event.target.id === 'delete-modal') {
      closeDeleteModal();
    }
  });

  renderApp();
};

init();