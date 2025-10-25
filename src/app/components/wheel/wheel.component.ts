import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss',
})
export class WheelComponent {
  sectors = Array.from({ length: 10 }, (_, i) => i + 1);
  selectedNumber: number | null = null;
  errorMessage = '';
  rotation = 0;
  spinning = false;

  spinWheel() {
    if (
      !this.selectedNumber ||
      this.selectedNumber < 1 ||
      this.selectedNumber > 10
    ) {
      this.errorMessage = 'The specified sector could not be found';
      return;
    }

    this.errorMessage = '';
    this.spinning = true;

    const sectorAngle = 36;

    const fullSpins = 5 * 360;
    const targetRotation =
      fullSpins +
      (360 - (this.selectedNumber - 1) * sectorAngle) -
      sectorAngle / 2;

    this.rotation = targetRotation;

    setTimeout(() => {
      this.spinning = false;
    }, 3000);
  }
}
