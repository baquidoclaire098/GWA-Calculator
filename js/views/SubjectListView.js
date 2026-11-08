
import View from './View.js';

class SubjectListView extends View {
  _generateMarkup() {
    if (this._data.length === 0) {
      return `
        <div class="subject-list">
          
          <p>No subjects added yet.</p>
        </div>
      `;
    }

    return `
      <div class="subject-list">
       
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Units</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            ${this._data.map(subject => `
              <tr>
                <td>${subject.subject}</td>
                <td>${subject.grade}</td>
                <td>${subject.units}</td>
                <td>
                  <button data-edit="${subject.id}">
                    Edit
                  </button>

                  <button data-delete="${subject.id}">
                    Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('[data-delete]');

      if (!button) return;

      handler(button.dataset.delete);
    });
  }

  addHandlerEdit(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('[data-edit]');

      if (!button) return;

      handler(button.dataset.edit);
    });
  }
}

export default new SubjectListView(
  document.querySelector('.subject-list-container')
);
