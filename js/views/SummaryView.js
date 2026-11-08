
import View from './View.js';

class SummaryView extends View {
  _generateMarkup() {
    return `
      <div class="gwa-summary">
        

        <div class="summary-card">
          <h3>General Weighted Average</h3>
          <p class="gwa-value">
            ${this._data.gwa.toFixed(2)}
          </p>
        </div>

        <div class="summary-details">
          <div>
            <h3>Total Subjects</h3>
            <p>${this._data.totalSubjects}</p>
          </div>

          <div>
            <h3>Total Units</h3>
            <p>${this._data.totalUnits}</p>
          </div>
        </div>
      </div>
    `;
  }
}

export default new SummaryView(
  document.querySelector('.summary-container')
);
