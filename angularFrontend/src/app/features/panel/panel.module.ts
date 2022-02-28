import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { LayoutModule }  from 'src/app/features/panel/layout/layout.module'

const routes: Routes = [
    {   path: '',
        component: PanelComponent,
        children: [
            {
            path:'home',
            // canLoad: [AuthentificationGuard],
            loadChildren: () =>
                import('./home/home.module').then((x) => x.HomeModule),
            },
        ],
    }
]


@NgModule({
    declarations: [PanelComponent],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        LayoutModule,
    ],
    // exports:[PanelComponent],
})
export class PanelModule {}
