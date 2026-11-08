import View from './View.js';

class SubjectFormView extends View {
  _generateMarkup() {
    return `
      <form class="subject-form" novalidate>

        <div class="form-grid">

          <div class="form-group">
            <label for="subject-name">Subject Name</label>
            <input
              type="text"
              id="subject-name"
              name="subject"
              placeholder="Enter subject name..."
              required
            >
          </div>

          <div class="form-group">
            <label for="grade">Grade</label>
            <input
              type="number"
              id="grade"
              name="grade"
              min="1"
              max="5"
              step="0.01"
              placeholder="Enter grade (1.00 – 5.00)..."
              required
            >
          </div>

          <div class="form-group">
            <label for="units">Units</label>
            <input
              type="number"
              id="units"
              name="units"
              min="0.5"
              max="6"
              step="0.5"
              placeholder="Enter units (0.5 – 6)..."
              required
            >
          </div>

          <div class="form-button">
            <button type="submit">Add Subject</button>
          </div>

        </div>

        <p class="form-error"></p>

        <button
          type="button"
          class="cancel-edit-button"
          hidden
        >
          Cancel Edit
        </button>

      </form>
    `;
  }

  addHandlerAddSubject(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();

      const form = event.target;

      if (!form.matches('.subject-form')) return;

      const formData = new FormData(form);

      const subjectData = {
        subject: formData.get('subject').trim(),
        grade: Number(formData.get('grade')),
        units: Number(formData.get('units'))
      };

      handler(subjectData);
    });
  }

  addHandlerCancelEdit(handler) {
    this._parentElement.addEventListener('click', function (event) {
      if (!event.target.closest('.cancel-edit-button')) return;

      handler();
    });
  }

  renderEdit(subject) {
    this._parentElement.querySelector('#subject-name').value =
      subject.subject;

    this._parentElement.querySelector('#grade').value =
      subject.grade;

    this._parentElement.querySelector('#units').value =
      subject.units;

    this._parentElement.querySelector('.submit-button');

    const submitButton =
      this._parentElement.querySelector('.form-button button');

    submitButton.textContent = 'Save Changes';

    this._parentElement.querySelector('.cancel-edit-button').hidden =
      false;

    this.renderError('');
  }

  resetForm() {
    this._parentElement.querySelector('.subject-form').reset();

    const submitButton =
      this._parentElement.querySelector('.form-button button');

    submitButton.textContent = 'Add Subject';

    this._parentElement.querySelector('.cancel-edit-button').hidden =
      true;

    this.renderError('');
  }

  renderError(message) {
    const errorElement =
      this._parentElement.querySelector('.form-error');

    if (errorElement) {
      errorElement.textContent = message;
    }
  }
}

export default new SubjectFormView(
  document.querySelector('.subject-form-container')
);