import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatTableModule,
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class MaterialModule { }
