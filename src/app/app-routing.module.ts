import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'cities-of-delhi',
    loadChildren: () => import('./cities-of-delhi/cities-of-delhi.module').then(m => m.CitiesOfDelhiPageModule)
  },
  {
    path: 'heritage-walks',
    loadChildren: () => import('./heritage-walks/heritage-walks.module').then(m => m.HeritageWalksPageModule)
  },
  {
    path: 'associated-people',
    loadChildren: () => import('./associated-people/associated-people.module').then(m => m.AssociatedPeoplePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'post/:id/:bid/:pagereturn',
    loadChildren: () => import('./post-details/post-details.module').then(m => m.PostdetailsPageModule)
  },
  {
    path: 'postwalk/:id',
    loadChildren: () => import('./post-walk-details/post-walk-details.module').then(m => m.PostwalkdetailsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'quizmodal',
    loadChildren: () => import('./quizmodal/quizmodal.module').then( m => m.QuizmodalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'special-move',
    loadChildren: () => import('./special-move/special-move.module').then( m => m.SpecialMovePageModule)
  },
  {
    path: 'specialmovemodal',
    loadChildren: () => import('./specialmovemodal/specialmovemodal.module').then( m => m.SpecialmovemodalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
