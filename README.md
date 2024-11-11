*******************Angular Template*******************************
-download and install nodeJS (node -v =>pour la version node)
-install Angular CLI => npm install -g @angular/cli
-uninstall Angular CLI => npm uninstall -g @angular/cli (ng vaersion)

-ng new angular-app => pour créer une application angular 
apartir angular 17 pas AppModule (ajouter --no-standalone pour avoir AppModule)

-ng serve --port 4201==>démarrer l'application dans le port 4201

-AppComponent file: le composant principal

-appConfig file : inclure la configuration de l'application comme(providers)

-app.routes file : pour le routage, mapper les comosants avec des routes spécifiques

-main file : le point d'entré de l'application, installer l'environnement nécessaire 
pour démarrer l'application

-angular.json : augmenter la taille l'éxecutable,config pou le test inclure le css, js
-package.json : contient les info des package(angular version...), commandes

-node_modules: ou les packages sont stockés
-si le dosiier node_modules est supprimé lancer la commande ==> npm install

**************************Material UI**************************
-ng add @angular/material==>installer angualer material
-aller au "https://material.angular.io/" pour utiliser des composants

*************************Components********************
-ng g c <componen-name>
-ng g c <componen-name> --inline-template --inline-style 
==>créer un composant ignore (html et css files)

**************************interpolation*************
bind les données de façon dynamique {{}}.

****************************Pipes***********************
fonction utiliser pour formatter, transformer et afficher les données
uppercase, lowercase, currency, number : '1.2-2', date, json ....
- ng g p custom/reverse

transform(value: string, ...args: string[]): string {
    return value.split('').reverse().join('');
  }

*****************************Property Binding***************************
technique pour définir la valeur d'une propriété dynamiquement utiliser []

**************************Event Binding********************************
ecouter la reponse d'une interaction comme click, mouvement souris, keystroke
<input  (keyup)="updateTitle($event)">

***************************Two way binding************************
permet la synchronisation entre model et view
[(ngModel)]="title" in html et importer FormsModule dans ts file

****************************Angular module*****************
permet de grouper directives, popes, services, components liés à l'application
==>pas important apartir de version 17 (standalone)
-ng g m <module-name>

***************************Angular Routing**********************
mécanisme permet de naviguer entre les vues(views) sans rafraichir toute la page
<router-outlet />
si on utilise un  {path : 'about/:submenu/:id', component : AboutComponent} dans app.route.ts
injecter ActivatedRoute 
this.route.snapshot.paramMap.get('id');

{path : 'customer', component : CustomerComponent,
  children: [
    {path : 'add', component : AddComponent},
    {path : 'edit/:id', component : AddComponent}
  ]},

{path : '**', component : StatusComponent}==>si url erroné aller au composant StatusComponent

**************************Angular Guard******************
des interfaces ou des fonctions implementés tous renforcer les règles de navigation
controler la navigation et l'accès au route
canActivate / canActivateChild / canDeactivate / canMatch

ajouter la propriété dans app.route
canActivate :[authGuard] applicable pour des routes particuliers
canActivateChild : [childauthGuard] applicable pour des toutes routes enfants
canDeactivate

**************************Lazy loading****************
technique permet de charger les modules d'une façon asynchrone lors la navigation à la 
route correspondant
ameliorer le chargement initial (charger à la demande)
ameliorer la performance de l'application / meilleure expérience utilisateur
Dans le fichier app.route remplacer component par loadComponent
loadComponent : ()=>import('./contact/contact.component').then(m=>m.ContactComponent)

***************************Angular Hooks*******************
life cycle events sont valables dans angular core
ngOnChanges==>éxecuter rapidement n'est pas capturer par le console
ngOnInit==>effectuer l'initialisation le composants et également récupérer les données
ngDoCheck==>reduire la performance, éxecuté chaque changement 
ngAfterContentInit==>
AfterContentChecked==>gérer toute modification du contenu de projet
AfterViewInit==>appeler lorsque le vue de composant et les vues des enfants sont initialisées
AfterViewChecked==>appeler aprés chaque verfication de composant et les vues des enfants sont initialisées

***************************Directives******************************
fonctionnalité qui vous permet de manipuler le DOM(Document Object Model),
d'améliorer les composants et de créer des comportements réutilisables:
-Component directives==>les composants de l'application
-Attribute directives==>[ngClass], [ngStyle]
-Structural directives==>*ngIf, *ngFor<===>@for, *ngSwitch

Control Flow Template:
@for (item of Roles; track item) {
          <mat-option [value]="item.value">{{item.viewValue}}</mat-option>
          } 

******************************Angular Forms***********************
permet de créer des applications web interactives(input data, submit it, interagir avec 
les fonctionnalitées de l'applicaton 
Template driven Forms: formulaire et logique simple avec un peut des champs
pour un exemple installer : npm install -g json-server
créer un fichier db.json puis lancer json-server --watch src/data/db.json 
utiliser localStorage (2:30-->3:00)

Reactive Forms: formulaire et logique compliqué

******************************Service***********************
 ng g s service/master

using table component of angular material with sorting and pagination

*****************************NGX-Toaster*********************
implementer les notifications on utilisant toaster
https://www.npmjs.com/package/ngx-toastr
npm i ngx-toastr ===> third part library

ajouter "provideToastr()" dans le fichier app.config.ts
ajouter "node_modules/ngx-toastr/toastr.css" dans les "styles" de fichier angular.json 

**************************Http interceptor******************
un composant middleware permet d'intercepter les requettes http avant les envoyés au serveur
modifier et manupuler les requette à travers toute l'application d'une manière centralisée

ng g interceptor <nom>

dans le composant interceptor créer
 let _token='';
  let jwt = req.clone({
    setHeaders:{
      Authorization : 'bearer '+_token
    }
  })

provideHttpClient(withInterceptors([tokenInterceptor])) dans app.config.ts

**********************Transfer data between compoponents************
1) @input ==>parent to child
créer un composant puis l'ajouter dans html de composant parent
créer un attribut dans le composant parent et faire le two way biding
<input [(ngModel)]="firstName">
    <app-child [firstName]="firstName" [lastName]="lastName"
     [_objName]="obj_"></app-child>

ajouter  @Input() firstName : any; dans le composant fils

2) @output ==> child to parent
dans child component file .ts @Output() dataUpdater = new EventEmitter<string>();
dans child component file .html <button (click)="dataUpdater.emit(name.value)">Transfer</button>
dans parent compoenent file .ts 
updateTitle1(title : any){
    this.title =  title;
  }
dans parent component file .html
<app-child (dataUpdater)="updateTitle1($event)"></app-child>

3)using @ViewChild

-dans parent .ts @ViewChild(ChildComponent) _child! : ChildComponent;
addFruit(fruit: any) {
    this._child.updateFruits(fruit);
  }
-dans parent .html
 <div>
      <input placeholder="fruitname" #fruit></input>
      <br>
      <button (click)="addFruit(fruit.value)">Update</button>
    </div>
-dans child .ts
fruits=['Apple', 'Orange'];
  updateFruits(fruitName : string){
    this.fruits.push(fruitName);
  }
4- unrelated components
  *********************************signals***********************
 -signals: state management option available from angular 16
 - holds a value and then notifies the user of any changes
 -pour modifier signal value:
     -Set: remplacer la valeur completement
     -Update: modifier
     -Mutate: inclure(ajouter) un nouveau objet
 fournir 2 functions et conversions
  pour functions:
     -Computed: exécuter s'il y a des changements (pour calculer lea somme)
     -Effect: executer les changements dans le signal
  pou conversions:
     -ToSignal: convert Observable to signal
     -ToObservable: convert signal to Observable
 Observable appartient à RxJs utilisation de subscribe
in service 
counterValue = signal<number>(0);
  players = signal([{'id' : 1, 'name':'Sacha'}]);
componet:
totalPlayers = computed(()=>this.masterService.players().length);
  _totalPlayers$ = toObservable(this.totalPlayers);//Observable
  _signalCount = toSignal(this._totalPlayers$);//signal

<h2>We have {{_totalPlayers$ | async}} players</h2>
<h2>We have {{_signalCount()}} players</h2>

*****************************Control flow template***************
fait référence à la possibilité de restituer conditionnellement des éléments HTML 
ou d'appliquer une logique basée sur certaines conditions @if @for @switch
@if(totalPlayers() == 0){                   
  <h1>No users</h1>
  }@else if(totalPlayers() == 1){
  <h1>Single user</h1>
  }@else{
  <h1>More users</h1>
  }

https://angular.dev/guide/templates/control-flow

********************************Deferable view**************************
introduit en angular 17
Angular permet de reporter le chargement des modules.composant ou des routes à la demande
impacter la performance
une sorte de lazy loading option

@defer(when count>2; on timer(1000ms)){
<div>
<h1>Angular 18 tuto</h1>
</div>
}@placeholder{
<h2>data will be available soon...</h2>
}@loading{
<h1>Loading...</h1>
}@error{
<h1>Failed to load</h1>
}

********************************Json-Server Api****************************
Third part tool
pour créer rapidement une API Rest pour simulation en utilsant JSON comme étant source
des données.
utiliser pour tester les scénarios de developpement et de test 
https://www.npmjs.com/package/json-server/v/0.17.3
 npm install -g json-server
json-server --watch src/data/db.json

******************************Basic crud actions*************************
crud using modal popup exemple (product component)

******************************RxJs***************************************
Reactive extensions for JavaScript librairie pour la programmation reactive 
en utilisant les observables.
résoudre la gestion des evennements async
Les concepts:
++++Observable :streams des données permet de reagir avec les changements
    les services retourne des observables pour les requettes HTTP 
1h:10min======>1h:22min dans learn component 
subscribe depuis html en utilisant async

++++Operators :fonctions utilisées pour composer des observables dans le pipe methodes
    1-map, filter catchError,switchMap, merge, concat, first, last, every, find,take, delay...
    concat s'il y a un retard(delay), il va attendre la reponse (synchrone)
    merge s'il y a un retard(delay), il ne va pas attendre la reponse (asynchrone) 
    filter peut retourner une liste 
    find une seule valeur
    every retourne true si la condition est vraie si on l'applique surtt les élements sinon false

++++Subjects :observables qui permet les valeurs d'être caster ou plusieurs observables.
    Subject subject$ = new Subject(); émettre et écouter des événements
    BehaviorSubject : emettre la derniére valeur emis au nouveau subscriber
    ReplaySubject :emettre tous les valeurs emis au nouveau subscriber
    AsycSubject : emettre la derniere valeur émis avant la completion

*********************************NGRX 1h:45min===>2h:45*****************************
librairie qui implémente la gestion reactive des états on utilisant RxJS
si les données à transferés entre les conposant sont limités on utilise RxJS
si les données sont complexes on uilise NGRX

cycle de vie: state management lifecycle

 selector<-----------------store                  BDD
    |                      /|\                    | |
    |                       |                     | |
    |                    reducer                service 
    |	                   /|\                    | |
    |                       |                     | |
   \|/                      |    --------------->effects    
 component---------------->action<---------------

-store: responsable des données stockées dans des format d'objets
ou on stock state
-action: envoyé(dispatcher) apartir des composants ou des effect avec les parametres 
et type des actions (les operations à faire sur les données stockées dans state
-reducer: modifier le données stockées(store)(basée sur les types des action
ou on peut initialiser state avec des valeur par defaut
-selector: consommer les données stockées pour qu'on peut les utilisées 
dans les composants(façon pour récuperer des données de Store)
-effect: : permet de manipuler les services
==========>pas de liaison directe entre les components et les services

aller au https://ngrx.io/

ng add @ngrx/store@latest / ng add @ngrx/effects@latest / ng add @ngrx/store-devtools@latest
provideStore(), provideEffects(),provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
==> ajouter au app.config.ts

installer "redux devtools" extension in chrome

=> tout est geré à travers le Store de ngrx et non pas les services
1-ajouter les action dans le fichier action .ts comme suit

export const ADD_PRODUCTS = '[product] add products'
export const ADD_PRODUCTS_SUCCESS = '[product] add products success'

export const addProducts = createAction(ADD_PRODUCTS, props<{inputData:Product}>());
export const addProductSuccess = createAction(ADD_PRODUCTS_SUCCESS, props<{ inputData: Product}>())

2- dans la classe Effect.ts utiliser le decorator @Injectable() puis 
injecter le service et les actions soit par le constructeur ou "private action$ = inject(Actions);"
_createproduct = createEffect(()=>
    this.action$.pipe(
      ofType(addProducts),
      switchMap((action)=>{
        return this.productService.createProduct(action.inputData).pipe(
          switchMap((data)=>{
            return of(addProductSuccess({inputData:action.inputData}),this.showAlert('Created successfully','pass'))
          }),
          catchError((err)=>of(this.showAlert(err.message,'fail')))
        )
      })
    )
  )
3- le fichier state.ts 
export const productState:ProductModel={
  list : [],
  errorMessage : "",
  editData : {
    id : 0,
    name : "",
    description :"",
    price : 0,
    status : false
  }

}

4-le fichier selector.ts
const getProductState = createFeatureSelector<ProductModel>('product');

export const getProductList = createSelector(getProductState,(state)=>{
  return state.list;
})

5- dans Reducer.ts importer le state.ts		
const _productReducer = createReducer(productState,

on(addProductSuccess, (state, action) => {
    const _maxId = Math.max(...state.list.map(o=>o.id));
    const _newData= {...action.inputData};
    _newData.id = _maxId+1;
    return {
      ...state,
      list: [...state.list,_newData],
      errormessage: ''
    }
  })
)

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}

on peut inscrire plusieurs etats (states) dans store avec
provideStore({'product': productReducer,'user':UserReducer})
dans le fichier app.config.ts

**********************Code Improvement**********************
1-Unsubscribe all subscription on destroy: causer de fuite mémoire
 implementer OnDestroy

subscription! : Subscription;
 ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
ou façon asynchrone pour subscribe et unsubscribe automatiquement
subscription= new Subscription();
let sub2 = this.productService.removeProduct(id).subscribe(item=>{
        alert('Removed Successfully');
        this.loadProducts();
      });
      this.subscription.add(sub2);

2-handling error
  -error function 
  -catchError function de RxJS

3- Make sure use Lazy Loading
Dans le fichier app.route remplacer component par loadComponent
loadComponent : ()=>import('./contact/contact.component').then(m=>m.ContactComponent)

4-create reusable components

5-provide exact  data type

6-create separate file for const variable, don't use hard code values

7-Create model with single responsability


**************************NG-Content*******************
directive sert comme étant placeholder dans un modèle composant    
transferer le contenu HTML d'un composant à un autre on peut placer de région obligatoire                             
utile pour les composants réutilisables

**********************Zone less change detection************
option d'amélioration des performances , on peut utiliser signals
technique permet d'eliminer ou reduire la dépendence avec NgZone
NgZone angular core service permet de gérer les operations asynchrone
assurer que le détection de changement pourangular fonctionne correctement
avec les évennement, le timer, d'autres tâches asynchrones de navigateur

dans angular.json supprimer "zone.js"
dans app.config.ts remplacer provideZoneChangeDetection({ eventCoalescing: true })
par provideExperimentalZonelessChangeDetection()
puis on utilise les signals

constructor() {
    setTimeout(()=>{
      this.title1 .set("Angular for beginners!!! ");
      console.log((this.title));
    },3000);
  }

title1 = signal<string>('Angular 18 Tutorial');
<h1>{{title1() | uppercase}}</h1>

******************************SSR Server-Side Rendering******************
donner le code HTML initial d'une application Web sur le serveur plutôt que 
dans le navigateur
donner plus d'avantages que CSR Client-side Rendering normal rendering

accéder au https://angular.dev/ et chercher ssr
ng add @angular/ssr

************************NGX Mask**************************
 npm i ngx-mask
ajouter dans app.config.ts provideEnvironmentNgxMask()

créer un composant mask et importer NgxMaskPipe, NgxMaskDirective dans fichier ts

***************Environmental Configuration***********
ng g environments
ng build --configuration=staging
ng serve --configuration=production

*********************************IIS(Internet Information Service) Deployment***********************
ng build
