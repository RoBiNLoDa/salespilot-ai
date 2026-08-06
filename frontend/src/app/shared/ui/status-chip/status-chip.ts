import { Component, input, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StatusChipConfig } from '@shared/models/status-chip-config';

@Component({
  selector: 'app-status-chip',
  imports: [MatIconModule],
  templateUrl: './status-chip.html',
  styleUrl: './status-chip.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StatusChip {
  readonly status = input.required<string>();

  readonly config = input.required<Record<string, StatusChipConfig>>();

  protected getStatus(status: string): StatusChipConfig {
    return this.config()[status];
  }
}
