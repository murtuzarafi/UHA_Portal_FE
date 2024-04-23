import { trigger,transition,query,style,group,animateChild,animate,keyframes } from "@angular/animations";
export const slideInAnimation =
trigger("routeAnimations", [

    transition('portfoliosummary <=> alert', [
        query("*", [
            style({ opacity: 1 }),
            animate(1000, style({ opacity: 0 }))
        ])
    ]),

    transition('einvestment <=> eredemption', [
        query("*", [
            style({ opacity: 1 }),
            animate(1000, style({ opacity: 0 }))
        ])

    ]),
]);

//   trigger('routeAnimations', [
//     transition('portfoliosummary <=> alert', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
        
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
        
//       ], { optional: true }),
//       query(':leave', animateChild(), { optional: true }),
//       group([
//         query(':leave', [
//           animate('300ms ease-out' )
//         ], { optional: true }),
//         query(':enter', [
//           animate('300ms ease-out')
//         ], { optional: true }),
//       ]),
//     ]),
//     transition('* <=> *', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
     
//           width: '100%'
//         })
//       ], { optional: true }),
//       query(':enter', [
       
//       ], { optional: true }),
//       query(':leave', animateChild(), { optional: true }),
//       group([
//         query(':leave', [
//           animate('200ms ease-out')
//         ], { optional: true }),
//         query(':enter', [
//           animate('300ms ease-out')
//         ], { optional: true }),
//         query('@*', animateChild(), { optional: true })
//       ]),
//     ])
//   ]);