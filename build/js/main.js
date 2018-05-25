(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="second",e="minute",n="hour",r="day",s="week",i="month",a="year",u=/^(\d{4})-?(\d{1,2})-?(\d{1,2})(.*?(\d{1,2}):(\d{1,2}):(\d{1,2}))?.?(\d{1,3})?$/,c=/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},h=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={padStart:h,padZoneStr:function(t){var e=Math.abs(t),n=Math.floor(e/60),r=e%60;return(t<=0?"+":"-")+h(n,2,"0")+":"+h(r,2,"0")},monthDiff:function(t,e){var n,r=12*(e.year()-t.year())+(e.month()-t.month()),s=t.clone().add(r,"months");return n=e-s<0?(e-s)/(s-t.clone().add(r-1,"months")):(e-s)/(t.clone().add(r+1,"months")-s),Number(-(r+n))},absFloor:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},prettyUnit:function(t){return t&&String(t).toLowerCase().replace(/s$/,"")},isUndefined:function(t){return void 0===t}},f="en",$={};$[f]=o;var l=function(t){return t instanceof p},m=function(t,e,n){var r;if(!t)return null;if("string"==typeof t)$[t]&&(r=t),e&&($[t]=e,r=t);else{var s=t.name;$[s]=t,r=s}return n||(f=r),r},y=function(t,e){if(l(t))return t.clone();var n=e||{};return n.date=t,new p(n)},M=function(t,e){return y(t,{locale:e.$L})},S=d;S.parseLocale=m,S.isDayjs=l,S.wrapper=M;var p=function(){function o(t){this.parse(t)}var h=o.prototype;return h.parse=function(t){var e,n;this.$d=null===(e=t.date)?new Date(NaN):S.isUndefined(e)?new Date:e instanceof Date?e:"string"==typeof e&&(n=e.match(u))?new Date(n[1],n[2]-1,n[3],n[5]||0,n[6]||0,n[7]||0,n[8]||0):new Date(e),this.init(t)},h.init=function(t){this.$y=this.$d.getFullYear(),this.$M=this.$d.getMonth(),this.$D=this.$d.getDate(),this.$W=this.$d.getDay(),this.$H=this.$d.getHours(),this.$m=this.$d.getMinutes(),this.$s=this.$d.getSeconds(),this.$ms=this.$d.getMilliseconds(),this.$L=this.$L||m(t.locale,null,!0)||f},h.$utils=function(){return S},h.isValid=function(){return!("Invalid Date"===this.$d.toString())},h.isLeapYear=function(){return this.$y%4==0&&this.$y%100!=0||this.$y%400==0},h.isSame=function(t){return this.valueOf()===t.valueOf()},h.isBefore=function(t){return this.valueOf()<t.valueOf()},h.isAfter=function(t){return this.valueOf()>t.valueOf()},h.year=function(){return this.$y},h.month=function(){return this.$M},h.day=function(){return this.$W},h.date=function(){return this.$D},h.hour=function(){return this.$H},h.minute=function(){return this.$m},h.second=function(){return this.$s},h.millisecond=function(){return this.$ms},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(u,c){var o=this,h=!!S.isUndefined(c)||c,d=function(t,e,n){void 0===n&&(n=o.$y);var s=M(new Date(n,e,t),o);return h?s:s.endOf(r)},f=function(t,e){return M(o.toDate()[t].apply(o.toDate(),h?[0,0,0,0].slice(e):[23,59,59,999].slice(e)),o)};switch(S.prettyUnit(u)){case a:return h?d(1,0):d(31,11,this.$y);case i:return h?d(1,this.$M):d(0,this.$M+1,this.$y);case s:return h?d(this.$D-this.$W,this.$M):d(this.$D+(6-this.$W),this.$M,this.$y);case r:case"date":return f("setHours",0);case n:return f("setMinutes",1);case e:return f("setSeconds",2);case t:return f("setMilliseconds",3);default:return this.clone()}},h.endOf=function(t){return this.startOf(t,!1)},h.$set=function(r,s){switch(S.prettyUnit(r)){case"date":this.$d.setDate(s);break;case i:this.$d.setMonth(s);break;case a:this.$d.setFullYear(s);break;case n:this.$d.setHours(s);break;case e:this.$d.setMinutes(s);break;case t:this.$d.setSeconds(s);break;case"millisecond":this.$d.setMilliseconds(s)}return this.init(),this},h.set=function(t,e){return this.clone().$set(t,e)},h.add=function(u,c){u=Number(u);var o,h=!c||1!==c.length&&"ms"!==c?S.prettyUnit(c):c;if(["M",i].indexOf(h)>-1){var d=this.set("date",1).set(i,this.$M+u);return d=d.set("date",Math.min(this.$D,d.daysInMonth()))}if(["y",a].indexOf(h)>-1)return this.set(a,this.$y+u);switch(h){case"m":case e:o=6e4;break;case"h":case n:o=36e5;break;case"d":case r:o=864e5;break;case"w":case s:o=6048e5;break;case"s":case t:o=1e3;break;default:o=1}var f=this.valueOf()+u*o;return M(f,this)},h.subtract=function(t,e){return this.add(-1*t,e)},h.format=function(t,e){var n=this,r=t||"YYYY-MM-DDTHH:mm:ssZ",s=S.padZoneStr(this.$d.getTimezoneOffset()),i=e||this.$locale(),a=i.weekdays,u=i.months;return r.replace(c,function(t){if(t.indexOf("[")>-1)return t.replace(/\[|\]/g,"");switch(t){case"YY":return String(n.$y).slice(-2);case"YYYY":return String(n.$y);case"M":return String(n.$M+1);case"MM":return S.padStart(n.$M+1,2,"0");case"MMM":return u[n.$M].slice(0,3);case"MMMM":return u[n.$M];case"D":return String(n.$D);case"DD":return S.padStart(n.$D,2,"0");case"d":return String(n.$W);case"dddd":return a[n.$W];case"H":return String(n.$H);case"HH":return S.padStart(n.$H,2,"0");case"h":case"hh":return 0===n.$H?12:S.padStart(n.$H<13?n.$H:n.$H-12,"hh"===t?2:1,"0");case"a":return n.$H<12?"am":"pm";case"A":return n.$H<12?"AM":"PM";case"m":return String(n.$m);case"mm":return S.padStart(n.$m,2,"0");case"s":return String(n.$s);case"ss":return S.padStart(n.$s,2,"0");case"SSS":return S.padStart(n.$ms,3,"0");case"Z":return s;default:return s.replace(":","")}})},h.diff=function(u,c,o){var h=S.prettyUnit(c),d=l(u)?u:y(u.valueOf()),f=this-d,$=S.monthDiff(this,d);switch(h){case a:$/=12;break;case i:break;case"quarter":$/=3;break;case s:$=f/6048e5;break;case r:$=f/864e5;break;case n:$=f/36e5;break;case e:$=f/6e4;break;case t:$=f/1e3;break;default:$=f}return o?$:S.absFloor($)},h.daysInMonth=function(){return this.endOf(i).$D},h.$locale=function(){return $[this.$L]},h.locale=function(t,e){return this.$L=m(t,e,!0),this},h.clone=function(){return M(this.toDate(),this)},h.toDate=function(){return new Date(this.$d)},h.toArray=function(){return[this.$y,this.$M,this.$D,this.$H,this.$m,this.$s,this.$ms]},h.toJSON=function(){return this.toISOString()},h.toISOString=function(){return this.toDate().toISOString()},h.toObject=function(){return{years:this.$y,months:this.$M,date:this.$D,hours:this.$H,minutes:this.$m,seconds:this.$s,milliseconds:this.$ms}},h.toString=function(){return this.$d.toUTCString()},o}();return y.extend=function(t,e){return t(e,p,y),y},y.locale=m,y.en=$[f],y});

},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.createAutoCorrectedDatePipe=t():e.createAutoCorrectedDatePipe=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mm dd yyyy";return function(t){var r=[],n=e.split(/[^dmyHMS]+/),o={dd:31,mm:12,yy:99,yyyy:9999,HH:23,MM:59,SS:59},i={dd:1,mm:1,yy:0,yyyy:1,HH:0,MM:0,SS:0},u=t.split("");n.forEach(function(t){var n=e.indexOf(t),i=parseInt(o[t].toString().substr(0,1),10);parseInt(u[n],10)>i&&(u[n+1]=u[n],u[n]=0,r.push(n))});var d=n.some(function(r){var n=e.indexOf(r),u=r.length,d=t.substr(n,u).replace(/\D/g,""),s=parseInt(d,10);return s>o[r]||d.length===u&&s<i[r]});return!d&&{value:u.join(""),indexesOfPipedChars:r}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r}])});
},{}],3:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.emailMask=t():e.emailMask=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(3)},,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function u(e,t){e=e.replace(y,h);var n=t.placeholderChar,r=t.currentCaretPosition,u=e.indexOf(x),s=e.lastIndexOf(d),f=s<u?-1:s,p=o(e,u+1,x),g=o(e,f-1,d),v=c(e,u,n),m=i(e,u,f,n),O=a(e,f,n,r);v=l(v),m=l(m),O=l(O,!0);var b=v.concat(p).concat(m).concat(g).concat(O);return b}function o(e,t,n){var r=[];return e[t]===n?r.push(n):r.push(g,n),r.push(g),r}function c(e,t){return t===-1?e:e.slice(0,t)}function i(e,t,n,r){var u=h;return t!==-1&&(u=n===-1?e.slice(t+1,e.length):e.slice(t+1,n)),u=u.replace(new RegExp("[\\s"+r+"]",m),h),u===x?p:u.length<1?v:u[u.length-1]===d?u.slice(0,u.length-1):u}function a(e,t,n,r){var u=h;return t!==-1&&(u=e.slice(t+1,e.length)),u=u.replace(new RegExp("[\\s"+n+".]",m),h),0===u.length?e[t-1]===d&&r!==e.length?p:h:u}function l(e,t){return e.split(h).map(function(e){return e===v?e:t?b:O})}Object.defineProperty(t,"__esModule",{value:!0});var s=n(4),f=r(s),p="*",d=".",h="",x="@",g="[]",v=" ",m="g",O=/[^\s]/,b=/[^.\s]/,y=/\s/g;t.default={mask:u,pipe:f.default}},function(e,t){"use strict";function n(e,t){var n=t.currentCaretPosition,o=t.rawValue,p=t.previousConformedValue,d=t.placeholderChar,h=e;h=r(h);var x=h.indexOf(i),g=null===o.match(new RegExp("[^@\\s."+d+"]"));if(g)return c;if(h.indexOf(l)!==-1||x!==-1&&n!==x+1||o.indexOf(u)===-1&&p!==c&&o.indexOf(a)!==-1)return!1;var v=h.indexOf(u),m=h.slice(v+1,h.length);return(m.match(f)||s).length>1&&h.substr(-1)===a&&n!==o.length&&(h=h.slice(0,h.length-1)),h}function r(e){var t=0;return e.replace(o,function(){return t++,1===t?u:c})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var u="@",o=/@/g,c="",i="@.",a=".",l="..",s=[],f=/\./g}])});
},{}],4:[function(require,module,exports){
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.vanillaTextMask=r():e.vanillaTextMask=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r=e.inputElement,t=(0,u.default)(e),n=function(e){var r=e.target.value;return t.update(r)};return r.addEventListener("input",n),t.update(r.value),{textMaskInputElement:t,destroy:function(){r.removeEventListener("input",n)}}}Object.defineProperty(r,"__esModule",{value:!0}),r.conformToMask=void 0,r.maskInput=o;var i=t(2);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=t(5),u=n(a);r.default=o},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_",r.strFunction="function"},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(r)){if(("undefined"==typeof r?"undefined":o(r))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");r=r(e,t),r=(0,i.processCaretTraps)(r).maskWithoutCaretTraps}var n=t.guide,s=void 0===n||n,f=t.previousConformedValue,d=void 0===f?l:f,c=t.placeholderChar,p=void 0===c?a.placeholderChar:c,v=t.placeholder,h=void 0===v?(0,i.convertMaskToPlaceholder)(r,p):v,m=t.currentCaretPosition,y=t.keepCharPositions,g=s===!1&&void 0!==d,b=e.length,C=d.length,k=h.length,x=r.length,P=b-C,T=P>0,O=m+(T?-P:0),M=O+Math.abs(P);if(y===!0&&!T){for(var w=l,S=O;S<M;S++)h[S]===p&&(w+=p);e=e.slice(0,O)+w+e.slice(O,b)}for(var _=e.split(l).map(function(e,r){return{char:e,isNew:r>=O&&r<M}}),j=b-1;j>=0;j--){var V=_[j].char;if(V!==p){var A=j>=O&&C===x;V===h[A?j-P:j]&&_.splice(j,1)}}var E=l,N=!1;e:for(var F=0;F<k;F++){var I=h[F];if(I===p){if(_.length>0)for(;_.length>0;){var L=_.shift(),R=L.char,J=L.isNew;if(R===p&&g!==!0){E+=p;continue e}if(r[F].test(R)){if(y===!0&&J!==!1&&d!==l&&s!==!1&&T){for(var W=_.length,q=null,z=0;z<W;z++){var B=_[z];if(B.char!==p&&B.isNew===!1)break;if(B.char===p){q=z;break}}null!==q?(E+=R,_.splice(q,1)):F--}else E+=R;continue e}N=!0}g===!1&&(E+=h.substr(F,k));break}E+=I}if(g&&T===!1){for(var D=null,G=0;G<E.length;G++)h[G]===p&&(D=G);E=null!==D?E.substr(0,D+1):l}return{conformedValue:E,meta:{someCharsRejected:N}}}Object.defineProperty(r,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=n;var i=t(3),a=t(1),u=[],l=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){for(var r=[],t=void 0;t=e.indexOf(f),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isArray=o,r.isString=i,r.isNumber=a,r.processCaretTraps=u;var l=t(1),s=[],f="[]"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,v=void 0===p?n:p,h=e.caretTrapIndexes,m=void 0===h?n:h;if(0===l||!f.length)return 0;var y=f.length,g=t.length,b=c.length,C=s.length,k=y-g,x=k>0,P=0===g,T=k>1&&!x&&!P;if(T)return l;var O=x&&(t===s||s===c),M=0,w=void 0,S=void 0;if(O)M=l-k;else{var _=s.toLowerCase(),j=f.toLowerCase(),V=j.substr(0,l).split(o),A=V.filter(function(e){return _.indexOf(e)!==-1});S=A[A.length-1];var E=a.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,F=N!==E,I=void 0!==a[A.length-1]&&void 0!==c[A.length-2]&&a[A.length-1]!==d&&a[A.length-1]!==c[A.length-1]&&a[A.length-1]===c[A.length-2];!x&&(F||I)&&E>0&&c.indexOf(S)>-1&&void 0!==f[l]&&(w=!0,S=f[l]);for(var L=v.map(function(e){return _[e]}),R=L.filter(function(e){return e===S}).length,J=A.filter(function(e){return e===S}).length,W=c.substr(0,c.indexOf(d)).split(o).filter(function(e,r){return e===S&&f[r]!==e}).length,q=W+J+R+(w?1:0),z=0,B=0;B<C;B++){var D=_[B];if(M=B+1,D===S&&z++,z>=q)break}}if(x){for(var G=M,H=M;H<=b;H++)if(c[H]===d&&(G=H),c[H]===d||m.indexOf(H)!==-1||H===b)return G}else if(w){for(var K=M-1;K>=0;K--)if(s[K]===S||m.indexOf(K)!==-1||0===K)return K}else for(var Q=M;Q>=0;Q--)if(c[Q-1]===d||m.indexOf(Q)!==-1||0===Q)return Q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,s=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?v.placeholderChar:g,C=n.keepCharPositions,k=void 0!==C&&C,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof s?"undefined":l(s))===y&&void 0!==s.pipe&&void 0!==s.mask&&(m=s.pipe,s=s.mask);var T=void 0,O=void 0;if(s instanceof Array&&(T=(0,p.convertMaskToPlaceholder)(s,b)),s!==!1){var M=a(t),w=o.selectionEnd,S=r.previousConformedValue,_=r.previousPlaceholder,j=void 0;if(("undefined"==typeof s?"undefined":l(s))===v.strFunction){if(O=s(M,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),O===!1)return;var V=(0,p.processCaretTraps)(O),A=V.maskWithoutCaretTraps,E=V.indexes;O=A,j=E,T=(0,p.convertMaskToPlaceholder)(O,b)}else O=s;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:T,currentCaretPosition:w,keepCharPositions:k},F=(0,c.default)(M,O,N),I=F.conformedValue,L=("undefined"==typeof m?"undefined":l(m))===v.strFunction,R={};L&&(R=m(I,u({rawValue:M},N)),R===!1?R={value:S,rejected:!0}:(0,p.isString)(R)&&(R={value:R}));var J=L?R.value:I,W=(0,f.default)({previousConformedValue:S,previousPlaceholder:_,conformedValue:J,placeholder:T,rawValue:M,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:R.indexesOfPipedChars,caretTrapIndexes:j}),q=J===T&&0===W,z=P?T:h,B=q?z:J;r.previousConformedValue=B,r.previousPlaceholder=T,o.value!==B&&(o.value=B,i(o,W))}}}}}function i(e,r){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(r,r,m)},0):e.setSelectionRange(r,r,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return h;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var s=t(4),f=n(s),d=t(2),c=n(d),p=t(3),v=t(1),h="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});
},{}],5:[function(require,module,exports){
'use strict';

var _mask = require('./module/mask');

var _validation = require('./module/validation');

const formSelector = '.js-form';
const fieldSelector = '.js-field';

window.paymentSystemInfo = {};

const forms = document.querySelectorAll(formSelector);

forms.forEach(form => {
  const elements = form.querySelectorAll(fieldSelector);

  elements.forEach(field => {
    let input;

    if (field.tagName.toLowerCase() === 'input') {
      input = field;
    } else {
      input = field.querySelector('input');
    }

    if (input) {
      const dataType = input.getAttribute('data-type');

      (0, _mask.setMask)(input, dataType);

      input.addEventListener('focus', () => {
        field.classList.remove('error');
        field.classList.remove('valid');
        field.classList.add('focus');
      });

      input.addEventListener('blur', () => {
        field.classList.remove('focus');

        if ((0, _validation.isValid)(input.value, dataType, true)) {
          field.classList.add('valid');
        } else {
          field.classList.add('error');
        }
      });
    }
  });

  form.addEventListener('submit', event => {
    let error = 0;

    elements.forEach(field => {
      let input;

      if (field.tagName.toLowerCase() === 'input') {
        input = field;
      } else {
        input = field.querySelector('input');
      }

      if (input) {
        const dataType = input.getAttribute('data-type');

        if ((0, _validation.isValid)(input.value, dataType, true)) {
          field.classList.add('valid');
        } else {
          field.classList.add('error');
          error += 1;
        }
      }
    });

    if (error) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

window.addEventListener('paymentSystemInfo', event => {
  const paymentSystemInfo = event.detail;

  const { name } = paymentSystemInfo;

  console.log(name);

  if (window.paymentSystemInfo.name !== name) {
    window.paymentSystemInfo = paymentSystemInfo;
  }
});

},{"./module/mask":7,"./module/validation":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCustomEvent = generateCustomEvent;
function generateCustomEvent(eventName, eventParams) {
  let { event } = window;

  event = new CustomEvent(eventName, { detail: eventParams });
  window.dispatchEvent(event);
}

try {
  const cEvent = new CustomEvent();
  cEvent("IE has CustomEvent, but doesn't support constructor");
} catch (e) {
  window.CustomEvent = function (event, params) {
    const eventParams = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
    return evt;
  };

  CustomEvent.prototype = Object.create(window.Event.prototype);
}

exports.default = {};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presetMask = exports.maskPattern = undefined;
exports.prepareMaskArray = prepareMaskArray;
exports.setMask = setMask;

var _vanillaTextMask = require('vanilla-text-mask');

var vanillaTextMask = _interopRequireWildcard(_vanillaTextMask);

var _emailMask = require('text-mask-addons/dist/emailMask');

var _emailMask2 = _interopRequireDefault(_emailMask);

var _createAutoCorrectedDatePipe = require('text-mask-addons/dist/createAutoCorrectedDatePipe');

var _createAutoCorrectedDatePipe2 = _interopRequireDefault(_createAutoCorrectedDatePipe);

var _paymentSystem = require('./paymentSystem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const maskPattern = exports.maskPattern = {
  '#': /\d/,
  S: /[a-zA-Z ]/,
  W: /[-a-zA-Zа-я-А-Я0-9 ]/
};

function prepareMaskArray(array) {
  const result = [];
  const patterns = Object.keys(maskPattern);

  array.forEach(item => {
    if (typeof item === 'string') {
      [...item].forEach(symbol => {
        if (patterns.includes(symbol)) {
          result.push(maskPattern[symbol]);
        } else {
          result.push(symbol);
        }
      });
    } else {
      result.push(item);
    }
  });

  return result;
}

const presetMask = exports.presetMask = {
  cardholder: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^a-z ]/gi, '').length;
      let stringMask = '';

      if (maskLength) {
        stringMask = 'S'.repeat(maskLength);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe(conformedValue) {
      return { value: conformedValue.toUpperCase() };
    },
    guide: true,
    placeholderChar: '\u2000'
  },

  cardnumber: {
    mask(rawValue) {
      const cardPan = rawValue.replace(/ /g, '').split('\u2000')[0];
      const paymentSystemInfo = (0, _paymentSystem.getPaymentSystemInfoByPan)(cardPan);
      const inputCardLength = rawValue.replace(/[^0-9]/g, '').length;
      let maskNumLength = 19;
      let stringMask = '';

      if (paymentSystemInfo) {
        const cardLengthList = paymentSystemInfo.cardLength.filter(key => key >= inputCardLength);

        if (cardLengthList && cardLengthList.length) {
          maskNumLength = Math.min(...cardLengthList);
        }
      }

      switch (maskNumLength) {
        case 14:
          stringMask = '#### ##### #####';
          break;

        case 15:
          stringMask = '##### ##### #####';
          break;

        case 16:
          stringMask = '#### #### #### ####';
          break;

        case 17:
          stringMask = '#### #### #### #####';
          break;

        case 18:
          stringMask = '#### #### #### #### ##';
          break;

        default:
          stringMask = '#### #### #### #### ###';
      }

      return prepareMaskArray([stringMask]);
    },

    pipe: null,
    guide: true,
    placeholderChar: '\u2000'
  },

  city: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^-a-zA-Zа-яА-Я0-9 ]/gi, '').length;
      let stringMask = '';

      if (maskLength) {
        stringMask = 'W'.repeat(maskLength);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000'
  },

  cvc: {
    mask() {
      let valueRangeList = [4];

      if (window.paymentSystemInfo.cvcLength) {
        valueRangeList = window.paymentSystemInfo.cvcLength;
      }

      const maskNumLength = valueRangeList[valueRangeList.length - 1];

      const stringMask = '#'.repeat(maskNumLength);

      return prepareMaskArray([stringMask]);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000'
  },

  email: {
    mask(rawValue, config) {
      return _emailMask2.default.mask(rawValue, config);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000'
  },

  expdate: {
    mask() {
      return prepareMaskArray(['## / ##']);
    },
    pipe(conformedValue) {
      const pipeFunction = (0, _createAutoCorrectedDatePipe2.default)('mm / yy');

      return pipeFunction(conformedValue);
    },
    guide: true,
    placeholderChar: '\u2000'
  },

  phone: {
    mask(rawValue) {
      let arrayMask = ['+7 (', /[1-9]/, '##) ###-##-##'];
      const startSymbolPosition = rawValue.search(/[+1-9]/);
      const startSymbol = rawValue[startSymbolPosition];

      if (startSymbol === '8') {
        arrayMask = ['8 (', /[1-9]/, '##) ###-##-##'];
      } else if (startSymbol === '+') {
        arrayMask = ['+', /[1-79]/, ' (', /[1-9]/, '##) ###-##-##'];
      }

      return prepareMaskArray(arrayMask);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000'
  }
};

function setMask(inputElement, maskName) {
  const presetMaskKeys = Object.keys(presetMask);

  if (presetMaskKeys.includes(maskName)) {
    const {
      mask, pipe, guide, placeholderChar
    } = presetMask[maskName];

    vanillaTextMask.maskInput({
      inputElement,
      mask,
      pipe,
      guide,
      placeholderChar
    });
  }
}

},{"./paymentSystem":8,"text-mask-addons/dist/createAutoCorrectedDatePipe":2,"text-mask-addons/dist/emailMask":3,"vanilla-text-mask":4}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentSystemList = exports.PaymentSystemDefault = undefined;
exports.getPaymentSystemInfoByPan = getPaymentSystemInfoByPan;

var _customEvent = require('./customEvent');

const PaymentSystemDefault = exports.PaymentSystemDefault = {
  name: '',
  range: [],
  cardLength: [14, 15, 16, 17, 18, 19],
  cvcLength: [3, 4]
};

const paymentSystemList = exports.paymentSystemList = [{
  name: 'amex',
  range: [{
    start: 340000,
    end: 349999
  }, {
    start: 370000,
    end: 379999
  }],
  cardLength: [15],
  cvcLength: [4]
}, {
  name: 'dinersclub',
  range: [{
    start: 300000,
    end: 305999
  }, {
    start: 309500,
    end: 309599
  }, {
    start: 360000,
    end: 369999
  }, {
    start: 380000,
    end: 399999
  }],
  cardLength: [14, 16],
  cvcLength: [3]
}, {
  name: 'discover',
  range: [{
    start: 601100,
    end: 601109
  }, {
    start: 601120,
    end: 601149
  }, {
    start: 601174,
    end: 601174
  }, {
    start: 601177,
    end: 601179
  }, {
    start: 601186,
    end: 601199
  }, {
    start: 644000,
    end: 659999
  }],
  cardLength: [16, 17, 18, 19],
  cvcLength: [3]
}, {
  name: 'jcb',
  range: [{
    start: 352800,
    end: 358999
  }],
  cardLength: [16],
  cvcLength: [3]
}, {
  name: 'maestro',
  range: [{
    start: 500000,
    end: 509999
  }, {
    start: 560000,
    end: 599999
  }, {
    start: 600000,
    end: 601099
  }, {
    start: 601200,
    end: 622125
  }, {
    start: 622999,
    end: 623999
  }, {
    start: 627000,
    end: 628199
  }, {
    start: 628900,
    end: 643999
  }, {
    start: 660000,
    end: 699999
  }],
  cardLength: [16, 17, 18, 19],
  cvcLength: [0, 3]
}, {
  name: 'mastercard',
  range: [{
    start: 510000,
    end: 559999
  }, {
    start: 222100,
    end: 272099
  }],
  cardLength: [16],
  cvcLength: [3]
}, {
  name: 'mir',
  range: [{
    start: 220000,
    end: 220499
  }],
  cardLength: [16, 17, 18, 19],
  cvcLength: [3]
}, {
  name: 'unionpay',
  range: [{
    start: 622126,
    end: 622998
  }, {
    start: 624000,
    end: 626999
  }, {
    start: 628200,
    end: 628899
  }],
  cardLength: [16, 17, 18, 19],
  cvcLength: [3]
}, {
  name: 'visa',
  range: [{
    start: 400000,
    end: 499999
  }],
  cardLength: [16, 17, 18, 19],
  cvcLength: [3]
}];

function getPaymentSystemInfoByPan(pan) {
  let binStart;
  let binEnd;
  let paymentSystemInfo = PaymentSystemDefault;

  if (pan.length >= 6) {
    const strBin = pan.substr(0, 6);

    binStart = Number(strBin);
    binEnd = Number(strBin);
  } else {
    const strBinStart = `${pan}00000`.substr(0, 6);
    const strBinEnd = `${pan}99999`.substr(0, 6);

    binStart = Number(strBinStart);
    binEnd = Number(strBinEnd);
  }

  paymentSystemList.forEach(paymentSystem => {
    const binRangeList = paymentSystem.range;

    if (binRangeList.some(range => range.start <= binStart && binEnd <= range.end)) {
      paymentSystemInfo = paymentSystem;
    }
  });

  (0, _customEvent.generateCustomEvent)('paymentSystemInfo', paymentSystemInfo);

  return paymentSystemInfo;
}

},{"./customEvent":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationPreset = undefined;
exports.isValid = isValid;

var _dayjs = require('dayjs');

var _dayjs2 = _interopRequireDefault(_dayjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validationPreset = exports.validationPreset = {
  cardholder(rawValue, isRequired) {
    const value = rawValue.trim();

    if (value !== '') {
      const rule = /^[a-z](.+?) [a-z](.+?)$/i;
      return rule.test(value);
    }

    if (isRequired) {
      return false;
    }

    return true;
  },

  cardnumber(rawValue, isRequired) {
    const value = rawValue.replace(/\D/g, '');
    let valueRangeList = [14, 15, 16, 17, 18, 19];

    if (window.paymentSystemInfo.cardLength) {
      valueRangeList = window.paymentSystemInfo.cardLength;
    }

    if (value !== '') {
      if (valueRangeList.includes(value.length)) {
        return false;
      }

      let nCheck = 0;
      let nDigit = 0;
      let bEven = false;

      for (let n = value.length - 1; n >= 0; n -= 1) {
        const cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
          if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
      }

      return nCheck % 10 === 0;
    }

    if (isRequired) {
      return false;
    }

    return true;
  },

  city(rawValue, isRequired) {
    const value = rawValue.trim();

    if (value !== '') {
      const rule = /.+?/;
      return rule.test(value);
    }

    if (isRequired) {
      return false;
    }

    return true;
  },

  cvc(rawValue, isRequired) {
    const value = rawValue.trim();

    if (value !== '') {
      const rule = /[0-9]{3,4}/;
      return rule.test(value);
    }

    if (isRequired) {
      return false;
    }

    return true;
  },

  email(rawValue, isRequired) {
    const value = rawValue.trim();

    if (value !== '') {
      const rule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return rule.test(value);
    }

    if (isRequired) {
      return false;
    }

    return true;
  },

  expdate(rawValue, isRequired) {
    const value = rawValue.trim();
    const currentDate = (0, _dayjs2.default)().set('date', 1).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);

    const minDate = (0, _dayjs2.default)(currentDate).add(-1, 'millisecond');

    const maxDate = (0, _dayjs2.default)(currentDate).add(5, 'year').add(1, 'month');

    if (value !== '') {
      const rule = /[^0-9]+/;

      const expDateList = value.split(rule);
      const month = Number(expDateList[0]);
      const year = Number(expDateList[1]);

      if (month === 0) {
        return false;
      }

      if (year === 0) {
        return false;
      }

      const expDate = (0, _dayjs2.default)(`20${year}-${month}-01`);

      if (expDate.isAfter(minDate) && expDate.isBefore(maxDate)) {
        return true;
      }

      return false;
    }

    if (isRequired) {
      return false;
    }

    return true;
  },

  phone(rawValue, isRequired) {
    const value = rawValue.replace(/\D/g, '');

    if (value !== '') {
      const rule = /[0-9]{9,12}/;
      return rule.test(value);
    }

    if (isRequired) {
      return false;
    }

    return true;
  }
};

function isValid(value, valueType, isRequired) {
  const validationPresetKeys = Object.keys(validationPreset);

  if (validationPresetKeys.includes(valueType)) {
    return validationPreset[valueType](value, isRequired);
  }

  return true;
}

},{"dayjs":1}]},{},[5]);
