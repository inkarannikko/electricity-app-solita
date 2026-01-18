import { Routes } from '@angular/router';
import { DailyStatisticsComponent } from './daily-statistics/daily-statistics';

export const routes: Routes = [
    { 
    path: '', 
    redirectTo: 'daily-statistics', 
    pathMatch: 'full' },

    {path: 'daily-statistics', 
    component: DailyStatisticsComponent
    }
];
