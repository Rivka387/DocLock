import { Component, OnInit } from '@angular/core';
import { UserActivityService } from '../../Services/user-activity.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-user-activity-graph',
  standalone: true,
  imports: [],
  templateUrl: './user-activity-graph.component.html',
  styleUrl: './user-activity-graph.component.css'
})
export class UserActivityGraphComponent implements OnInit {
  public yearlyData: { [key: number]: number } = {};
  public monthlyData: { [key: number]: number } = {};

  constructor(private userActivityService: UserActivityService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // קריאה לשירות לקבלת נתוני השימוש השנתי
    this.userActivityService.getYearlyUsage(currentYear).subscribe(data => {
      this.yearlyData = data;
      this.createLineChart();
    });

    // קריאה לשירות לקבלת נתוני השימוש החודשי
    this.userActivityService.getMonthlyUsage(currentYear, currentMonth).subscribe(data => {
      this.monthlyData = data;
      this.createStackedBarChart();
    });
  }

  // יצירת גרף מסוג Line עבור השימוש השנתי
  createLineChart(): void {
    // יצירת נתוני החודשים
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 עד 12 חודשים
    const usageCounts = months.map(month => this.yearlyData[month] || 0); // אם אין נתונים לחודש, נכניס 0

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: months.map(month => `month ${month}`),
        datasets: [{
          label: 'Annual use',
          data: usageCounts,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'category' }, // הוספת scale מתאים
          y: { type: 'linear', beginAtZero: true } // הוספת scale מתאים
        }
      }
    });
  }

  // יצירת גרף מסוג Bar עבור השימוש החודשי
  createStackedBarChart(): void {
    // יצירת נתוני הימים
    const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1 עד 31 ימים
    const usageCounts = days.map(day => this.monthlyData[day] || 0); // אם אין נתונים ליום, נכניס 0

    new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: days.map(day => `day ${day}`),
        datasets: [{
          label: 'Monthly usage',
          data: usageCounts,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'category', stacked: true }, // הוספת scale מתאים
          y: { type: 'linear', stacked: true } // הוספת scale מתאים
        }
      }
    });
  }
}

