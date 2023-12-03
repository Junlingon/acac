// import { CodeMode } from '@woodman/server/codemode_types/types/codemodeInterface';
// import { LoDashStatic } from 'lodash';
// import { AxiosInstance } from 'axios';

// const createCodemode: (_: LoDashStatic, axios: AxiosInstance) => CodeMode = ({ get }, axios) => {
//     axios;
//     return {
//         formHook: {
//             'license.checked': {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'show')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             'license.list': {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'show')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             'license.color': {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'show')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             'license.lh': {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'show')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             'license.cb': {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'show')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             'license.cbc': {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'show')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             position: {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'fixed')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             showTime: {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'fixed')) {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             },
//             showTimeModule: {
//                 onSchemaValueUpdate(changed, ctx) {
//                     const { now } = changed;
//                     if (get(now, 'fixed') && get(now, 'showTime')[0] === '1') {
//                         ctx.setVisible(true);
//                     } else {
//                         ctx.setVisible(false);
//                     }
//                 }
//             }
//         }
//     }
// }

// (window as any)['__codemode_placeholder__'] = createCodemode;
