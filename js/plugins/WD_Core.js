//=============================================================================
// Plugin Name: WinterDream Core Plugin
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: This is a parent plugin that handles the common basic functions of other plugins
// Terms of Use: By using this plugin you agree at our ToU (https://drive.google.com/file/d/1lG2Lep2Unme80ghZD7-fA-hPGWKLsiR7/view)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc This is a parent plugin that handles the common basic functions of other plugins
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 *
 *
 * @help WD:Core.js
 * 
 * This plugin handles the most common functions in the WinterDream
 * plugins. If by any chance you need them for your game or your
 * plugins, feel free to use them! Here is a list:
 * 
 * - window.WD_Interplugin_Core.translateData(defaultTextObject,translationObjectsArray)
 *   This plugin auto-detects the language on the user system, if he finds a matching
 *   value he will return the text object matching the user settings, if not, he will
 *   return the default text Object. Every text object must include a "language" property
 *   (including the Default text Object) with one of the 183 supported languages (see
 *   below for the complete list). The other properties are up to you and should 
 *   include the text strings.
 * - window.WD_Interplugin_Core.forceLanguage(defaultTextObject,translationObjectsArray,language)
 *   Works as Translate Data but instead of auto-detecting the user language it will try
 *   to force a language among the availables one.
 *   First it will check if the forced language is the defaultText, if not it will check
 *   if the language is in the translation array pack. If it doesn't find a matching 
 *   criteria it will return the default text. Like above, every text pack must include
 *   a language property that needs to match with the below list.
 * - window.WD_Interplugin_Core.textExAligner(string,alignment)
 *   This function works with multiple lines text (usually separated by "\n"), just feed
 *   the text string and the desired alignment ("Left", "Center" or "Right"). 
 *   The function will calculate the strings lenght (including icons and code) and will
 *   use spacing to align them as wanted. All the common RMMZ codes (\I[4], \C[3], ...)
 *   are processed to correctly align the string.
 * - window.WD_Interplugin_Core.realTextDimensions(window,string,font)
 *   This function calculates the width and height of a TextEx with the current font
 *   settings of the Window (base RMMZ function resets the font before calculating).
 *   This function calls for some window_base functions so be sure to feed the 
 *   current Window object as first argument, the text Ex string as second
 *   Returns an object with width and height properties
 * - window.WD_Interplugin_Core.drawTextExSize(currentWindow, text, x, y, width, font)
 *   This function works as drawTextEX but it forces a certain fontSize (while the base
 *   RMMZ drawTextEx reset the font). Of course be sure to feed as first arguement the
 *   current Window object for it to work, then the string, the starting X, the starting
 *   Y, the maximum width and the desired font size
 * 
 * The Core also introduces two new Classes that you can use both via script or in your
 * plugins:
 * 
 * - WD_FloatingText: This class mimics the damage text in the RMMZ battle but you can use
 *   it to show whatever text you want. To use it you need to create it as a sprite, for 
 *   example const sprite = new WD_FloatingText(text,false,false), then add it to the game
 *   as any other Sprite. The arguments are text (the text string you want to display) and
 *   two booleans: isPositive and isNegative, the first will flash the text green, the second
 *   will flash the text red. The Sprite, like the RMMZ damage sprite, will autodestroy once
 *   the animation is done.
 * - WD_Gauge: This is a gauge that mimics RMMZ gauges but it's not linked to the usual
 *   parameters (hp, mp or tp). To create it simply call it, for example:
 *   const gauge = new WD_Gauge(thisWindow,placementObj,dataObj,colorObj)
 *   The arguments are: 
 *   - The window object were the gauge needs to be drawn
 *   - A placement object with the following properties: x, y, width, height
 *   - A data object with the following properties: text, currentValue, maxValue
 *   - An optional color object (if you don't insert this obj the gauge will use RMMZ HP
 *     gauge standard colors) with the following properties (in hex string): gaugeColor1, 
 *     gaugeColor2, gaugeBack, labelMainColor, labelOutlineColor.
 *  The gauge comes with 4 functions: 
 *  - updateGauge: Pass again the dataObj to update the gauge
 *  - removeGauge: Self explanatory
 *  - setGaugeSpeed: Pass the update time in seconds (default is 0.1)
 *  - isPlaying: it will return a boolean, TRUE if the gauge is updating, FALSE if it's still
 *
 * 
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 * And if you want a direct line with me, you can join my Discord:
 * https://discord.gg/gaa2E2pJ
 * 
 * LANGUAGE DETECTOR SUPPORTED VALUES:
 *    	Abkhazian
 *  	Afar
 *  	Afrikaans
 *  	Akan
 *  	Albanian
 *  	Amharic
 *  	Arabic
 *  	Aragonese
 *  	Armenian
 *  	Assamese
 *  	Avaric
 *  	Avestan
 *  	Aymara
 *  	Azerbaijani
 *  	Bambara
 *  	Bashkir
 *  	Basque
 *  	Belarusian
 *  	Bengali
 *  	Bislama
 *  	Bosnian
 *  	Breton
 *  	Bulgarian
 *  	Burmese
 *  	Catalan, Valencian
 *  	Chamorro
 *  	Chechen
 *  	Chichewa, Chewa, Nyanja
 *  	Chinese
 *  	Church Slavonic, Old Slavonic, Old Church Slavonic
 *  	Chuvash
 *  	Cornish
 *  	Corsican
 *  	Cree
 *  	Croatian
 *  	Czech
 *  	Danish
 *  	Divehi, Dhivehi, Maldivian
 *  	Dutch, Flemish
 *  	Dzongkha
 *  	English
 *  	Esperanto
 *  	Estonian
 *  	Ewe
 *  	Faroese
 *  	Fijian
 *  	Finnish
 *  	French
 *  	Western Frisian
 *  	Fulah
 *  	Gaelic, Scottish Gaelic
 *  	Galician
 *  	Ganda
 *  	Georgian
 *  	German
 *  	Greek, Modern (1453–)
 *  	Kalaallisut, Greenlandic
 *  	Guarani
 *  	Gujarati
 *  	Haitian, Haitian Creole
 *  	Hausa
 *  	Hebrew
 *  	Herero
 *  	Hindi
 *  	Hiri Motu
 *  	Hungarian
 *  	Icelandic
 *  	Ido
 *  	Igbo
 *  	Indonesian
 *  	Interlingua (International Auxiliary Language Association)
 *  	Interlingue, Occidental
 *  	Inuktitut
 *  	Inupiaq
 *  	Irish
 *  	Italian
 *  	Japanese
 *  	Javanese
 *  	Kannada
 *  	Kanuri
 *  	Kashmiri
 *  	Kazakh
 *  	Central Khmer
 *  	Kikuyu, Gikuyu
 *  	Kinyarwanda
 *  	Kirghiz, Kyrgyz
 *  	Komi
 *  	Kongo
 *  	Korean
 *  	Kuanyama, Kwanyama
 *  	Kurdish
 *  	Lao
 *  	Latin
 *  	Latvian
 *  	Limburgan, Limburger, Limburgish
 *  	Lingala
 *  	Lithuanian
 *  	Luba-Katanga
 *  	Luxembourgish, Letzeburgesch
 *  	Macedonian
 *  	Malagasy
 *  	Malay
 *  	Malayalam
 *  	Maltese
 *  	Manx
 *  	Maori
 *  	Marathi
 *  	Marshallese
 *  	Mongolian
 *  	Nauru
 *  	Navajo, Navaho
 *  	North Ndebele
 *  	South Ndebele
 *  	Ndonga
 *  	Nepali
 *  	Norwegian
 *  	Norwegian Bokmål
 *  	Norwegian Nynorsk
 *  	Occitan
 *  	Ojibwa
 *  	Oriya
 *  	Oromo
 *  	Ossetian, Ossetic
 *  	Pali
 *  	Pashto, Pushto
 *  	Persian
 *  	Polish
 *  	Portuguese
 *  	Punjabi, Panjabi
 *  	Quechua
 *  	Romanian, Moldavian, Moldovan
 *  	Romansh
 *  	Rundi
 *  	Russian
 *  	Northern Sami
 *  	Samoan
 *  	Sango
 *  	Sanskrit
 *  	Sardinian
 *  	Serbian
 *  	Shona
 *  	Sindhi
 *  	Sinhala, Sinhalese
 *  	Slovak
 *  	Slovenian
 *  	Somali
 *  	Southern Sotho
 *  	Spanish, Castilian
 *  	Sundanese
 *  	Swahili
 *  	Swati
 *  	Swedish
 *  	Tagalog
 *  	Tahitian
 *  	Tajik
 *  	Tamil
 *  	Tatar
 *  	Telugu
 *  	Thai
 *  	Tibetan
 *  	Tigrinya
 *  	Tonga (Tonga Islands)
 *  	Tsonga
 *  	Tswana
 *  	Turkish
 *  	Turkmen
 *  	Twi
 *  	Uighur, Uyghur
 *  	Ukrainian
 *  	Urdu
 *  	Uzbek
 *  	Venda
 *  	Vietnamese
 *  	Volapük
 *  	Walloon
 *  	Welsh
 *  	Wolof
 *  	Xhosa
 *  	Sichuan Yi, Nuosu
 *  	Yiddish
 *  	Yoruba
 *  	Zhuang, Chuang
 *  	Zulu
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 * //////////////////////////////////////////////////
 * VERSION 1.0:
 * - Initial Release
 * //////////////////////////////////////////////////
 *
 */

 class WD_Gauge{constructor(e,a={x:0,y:0,width:0,height:0},t={text:"",currentValue:0,maxValue:0},n={gaugeColor1:"#e08040",gaugeColor2:"#f0c040",gaugeBack:"#202040",labelMainColor:"#84aaff",labelOutlineColor:"rgba(0, 0, 0, 0.6)",valueColor:"#ffffff"}){this.targetWindow=e,this.coordinates=a,this.data=t,this.colors=this.buildColors(n,e),this.currentState={text:this.data.text,currentValue:this.data.currentValue,maxValue:this.data.maxValue,targetValue:null,targetMaxValue:null},this.duration=0,this.isBusy=!1,this.gaugeSpeed=.1,this.drawGauge(),this.drawLabel()}updateGauge(e={text:"",currentValue:0,maxValue:0}){""!==e.text&&(this.currentState.text=e.text);var a=this.currentState.currentValue,t=this.currentState.maxValue;a===e.currentValue&&t===e.maxValue||this.updateTargetValue(e.currentValue,e.maxValue),this.updateGaugeAnimation()}removeGauge(){var e=this.coordinates.x,a=this.coordinates.y,t=this.coordinates.width,n=this.coordinates.height,o=this.gaugeRate(),o=Math.floor((t-2)*o),i=n-2;this.targetWindow.contents.clearRect(e,a,t,n),this.targetWindow.contents.clearRect(e+1,a+1,o,i),this.currentState.currentValue=null,this.currentState.maxValue=null}isPlaying(){return this.isBusy}setGaugeSpeed(e){isNaN(e)||(this.gaugeSpeed=e)}buildColors(e){return{gaugeColor1:""!==e.gaugeColor1&&null!=e.gaugeColor1?e.gaugeColor1:this.targetWindow.contents.textColor,gaugeColor2:""!==e.gaugeColor2&&null!=e.gaugeColor2?e.gaugeColor2:this.targetWindow.contents.outlineColor,gaugeBack:""!==e.gaugeBack&&null!=e.gaugeBack?e.gaugeBack:ColorManager.gaugeBackColor(),labelMainColor:""!==e.labelMainColor&&null!=e.labelMainColor?e.labelMainColor:ColorManager.systemColor(),labelOutlineColor:""!==e.labelOutlineColor&&null!=e.labelOutlineColor?e.labelOutlineColor:ColorManager.outlineColor(),valueColor:""!==e.valueColor&&null!=e.valueColor?e.valueColor:ColorManager.normalColor()}}drawGauge(){var e=this.coordinates.x,a=this.coordinates.y,t=this.coordinates.width,n=this.coordinates.height,o=this.gaugeRate(),o=Math.floor((t-2)*o),i=n-2,r=this.colors.gaugeBack,c=this.colors.gaugeColor1,s=this.colors.gaugeColor2;this.targetWindow.contents.fillRect(e,a,t,n,r),this.targetWindow.contents.gradientFillRect(e+1,a+1,o,i,c,s)}gaugeRate(){var e=this.currentState.currentValue,a=this.currentState.maxValue;return 0<a?1<(e=e/a)?1:e:0}drawLabel(){var e=this.textRefiner(this.currentState.text),a=this.labelOutlineWidth()/2,t=this.labelY(),n=this.bitmapWidth(),o=this.textHeight();this.setupLabelFont(),this.targetWindow.contents.drawText(e,a,t,n,o,"left"),this.targetWindow.resetFontSettings(),this.targetWindow.resetTextColor()}updateTargetValue(e,a){this.currentState.targetValue=e,this.currentState.targetMaxValue=a,isNaN(this.currentState.currentValue)?(this.currentState.currentValue=e,this.currentState.maxValue=a,this.redraw()):this.duration=20}updateGaugeAnimation(){var e;0<this.duration&&(e=this.duration,this.currentState.currentValue=(this.currentState.currentValue*(e-1)+this.currentState.targetValue)/e,this.currentState.maxValue=(this.currentState.maxValue*(e-1)+this.currentState.targetMaxValue)/e,this.duration--,this.redraw())}redraw(){this.isBusy=!0,this.removeForRedraw();var e=this.currentState.currentValue;isNaN(e)?this.isBusy=!1:(this.drawGauge(),this.drawLabel(),this.checkDuration())}checkDuration(){const e=this;var a=this.gaugeSpeed;0<this.duration?this.waitSeconds(a).then(function(){e.updateGaugeAnimation()}).catch(function(e){throw new Error("WD_Core: Error in the Gauge Duration function! Erorr: "+e)}):this.isBusy=!1}waitSeconds(a){return new Promise(function(e){setTimeout(function(){e()},1e3*a)})}removeForRedraw(){var e=this.coordinates.x,a=this.coordinates.y,t=this.coordinates.width,n=this.coordinates.height,o=this.gaugeRate(),o=Math.floor((t-2)*o),i=n-2;this.targetWindow.contents.clearRect(e,a,t,n),this.targetWindow.contents.clearRect(e+1,a+1,o,i)}labelOutlineWidth(){return 3}labelY(){return 3}bitmapWidth(){return 128}textHeight(){return 24}setupLabelFont(){this.targetWindow.contents.fontFace=this.labelFontFace(),this.targetWindow.contents.fontSize=this.labelFontSize(),this.targetWindow.contents.textColor=this.labelColor(),this.targetWindow.contents.outlineColor=this.labelOutlineColor(),this.targetWindow.contents.outlineWidth=this.labelOutlineWidth()}labelFontFace(){return $gameSystem.mainFontFace()}labelFontSize(){return $gameSystem.mainFontSize()-2}labelColor(){return this.colors.labelMainColor}labelOutlineColor(){return this.colors.labelOutlineColor}labelOutlineWidth(){return 3}textRefiner(e){let a=String(e);return a=(a=a.replaceAll("_VALUE_",this.currentState.currentValue)).replaceAll("_MAX_",this.currentState.maxValue)}}class WD_FloatingText extends Sprite{constructor(e={text:"",positiveFlash:!1,negativeFlash:!1}){super(),this._duration=90,this._flashColor=[0,0,0,0],this._flashDuration=0,this._colorType=0,this._textObj=e,this.setup(),(this._textObj.positiveFlash||this._textObj.negativeFlash)&&this.criticalEffect(this._textObj.positiveFlash),this.wdCode="WD_FloatingText"}setup(){var e=this.stringApproxWidth(this._textObj.text),a=this.fontSize(),e=Math.floor(a*e),t=this.createChildSprite(e,a);t.bitmap.drawText(this._textObj.text,0,0,e,a,"center"),t.dy=0}stringApproxWidth(e){var e=String(e).length,a=Graphics.width,e=Math.floor(e/5*3)<=0?1:Math.floor(e/5*3),t=($gameSystem.mainFontSize()+4)*e;return t<=a/4?e:t<=a/2?Math.floor(e/3*2):t<=.75*a?Math.floor(e/2):t<a?Math.floor(e/3):Math.floor(e/4)}criticalEffect(e){this._flashColor=e?[0,255,0,160]:[255,0,0,160],this._flashDuration=60}createChildSprite(e,a){var t=new Sprite;return t.bitmap=this.createBitmap(e,a),t.anchor.x=.5,t.anchor.y=1,t.y=-40,t.ry=t.y,this.addChild(t),t}createBitmap(e,a){e=new Bitmap(e,a);return e.fontFace=this.fontFace(),e.fontSize=this.fontSize(),e.textColor=this.damageColor(),e.outlineColor=this.outlineColor(),e.outlineWidth=this.outlineWidth(),e}fontFace(){return $gameSystem.numberFontFace()}fontSize(){return $gameSystem.mainFontSize()+4}damageColor(){return ColorManager.textColor(this._colorType)}outlineColor(){return"rgba(0, 0, 0, 0.7)"}outlineWidth(){return 4}update(){if(Sprite.prototype.update.call(this),0<this._duration){this._duration--;for(const e of this.children)this.updateChild(e)}this.updateFlash(),this.updateOpacity()}updateChild(e){e.dy+=.5,e.ry+=e.dy,0<=e.ry&&(e.ry=0,e.dy*=-.6),e.y=Math.round(e.ry),e.setBlendColor(this._flashColor)}updateFlash(){var e;0<this._flashDuration&&(e=this._flashDuration--,this._flashColor[3]*=(e-1)/e)}updateOpacity(){this._duration<10&&(this.opacity=255*this._duration/10)}destroy(e){for(const a of this.children)a.bitmap&&a.bitmap.destroy();Sprite.prototype.destroy.call(this,e)}isPlaying(){return 0<this._duration}}!function(){function e(e,a){for(const i of navigator.languages){var t=o(e.language);if(i.includes(t))return e;for(const r of a){var n=o(r.language);if(i.includes(n))return r}}function o(e){for(const a of[{name:"Abkhazian",code:"ab"},{name:"Afar",code:"aa"},{name:"Afrikaans",code:"af"},{name:"Akan",code:"ak"},{name:"Albanian",code:"sq"},{name:"Amharic",code:"am"},{name:"Arabic",code:"ar"},{name:"Aragonese",code:"an"},{name:"Armenian",code:"hy"},{name:"Assamese",code:"as"},{name:"Avaric",code:"av"},{name:"Avestan",code:"ae"},{name:"Aymara",code:"ay"},{name:"Azerbaijani",code:"az"},{name:"Bambara",code:"bm"},{name:"Bashkir",code:"ba"},{name:"Basque",code:"eu"},{name:"Belarusian",code:"be"},{name:"Bengali",code:"bn"},{name:"Bislama",code:"bi"},{name:"Bosnian",code:"bs"},{name:"Breton",code:"br"},{name:"Bulgarian",code:"bg"},{name:"Burmese",code:"my"},{name:"Catalan, Valencian",code:"ca"},{name:"Chamorro",code:"ch"},{name:"Chechen",code:"ce"},{name:"Chichewa, Chewa, Nyanja",code:"ny"},{name:"Chinese",code:"zh"},{name:"Church Slavonic, Old Slavonic, Old Church Slavonic",code:"cu"},{name:"Chuvash",code:"cv"},{name:"Cornish",code:"kw"},{name:"Corsican",code:"co"},{name:"Cree",code:"cr"},{name:"Croatian",code:"hr"},{name:"Czech",code:"cs"},{name:"Danish",code:"da"},{name:"Divehi, Dhivehi, Maldivian",code:"dv"},{name:"Dutch, Flemish",code:"nl"},{name:"Dzongkha",code:"dz"},{name:"English",code:"en"},{name:"Esperanto",code:"eo"},{name:"Estonian",code:"et"},{name:"Ewe",code:"ee"},{name:"Faroese",code:"fo"},{name:"Fijian",code:"fj"},{name:"Finnish",code:"fi"},{name:"French",code:"fr"},{name:"Western Frisian",code:"fy"},{name:"Fulah",code:"ff"},{name:"Gaelic, Scottish Gaelic",code:"gd"},{name:"Galician",code:"gl"},{name:"Ganda",code:"lg"},{name:"Georgian",code:"ka"},{name:"German",code:"de"},{name:"Greek, Modern (1453–)",code:"el"},{name:"Kalaallisut, Greenlandic",code:"kl"},{name:"Guarani",code:"gn"},{name:"Gujarati",code:"gu"},{name:"Haitian, Haitian Creole",code:"ht"},{name:"Hausa",code:"ha"},{name:"Hebrew",code:"he"},{name:"Herero",code:"hz"},{name:"Hindi",code:"hi"},{name:"Hiri Motu",code:"ho"},{name:"Hungarian",code:"hu"},{name:"Icelandic",code:"is"},{name:"Ido",code:"io"},{name:"Igbo",code:"ig"},{name:"Indonesian",code:"id"},{name:"Interlingua (International Auxiliary Language Association)",code:"ia"},{name:"Interlingue, Occidental",code:"ie"},{name:"Inuktitut",code:"iu"},{name:"Inupiaq",code:"ik"},{name:"Irish",code:"ga"},{name:"Italian",code:"it"},{name:"Japanese",code:"ja"},{name:"Javanese",code:"jv"},{name:"Kannada",code:"kn"},{name:"Kanuri",code:"kr"},{name:"Kashmiri",code:"ks"},{name:"Kazakh",code:"kk"},{name:"Central Khmer",code:"km"},{name:"Kikuyu, Gikuyu",code:"ki"},{name:"Kinyarwanda",code:"rw"},{name:"Kirghiz, Kyrgyz",code:"ky"},{name:"Komi",code:"kv"},{name:"Kongo",code:"kg"},{name:"Korean",code:"ko"},{name:"Kuanyama, Kwanyama",code:"kj"},{name:"Kurdish",code:"ku"},{name:"Lao",code:"lo"},{name:"Latin",code:"la"},{name:"Latvian",code:"lv"},{name:"Limburgan, Limburger, Limburgish",code:"li"},{name:"Lingala",code:"ln"},{name:"Lithuanian",code:"lt"},{name:"Luba-Katanga",code:"lu"},{name:"Luxembourgish, Letzeburgesch",code:"lb"},{name:"Macedonian",code:"mk"},{name:"Malagasy",code:"mg"},{name:"Malay",code:"ms"},{name:"Malayalam",code:"ml"},{name:"Maltese",code:"mt"},{name:"Manx",code:"gv"},{name:"Maori",code:"mi"},{name:"Marathi",code:"mr"},{name:"Marshallese",code:"mh"},{name:"Mongolian",code:"mn"},{name:"Nauru",code:"na"},{name:"Navajo, Navaho",code:"nv"},{name:"North Ndebele",code:"nd"},{name:"South Ndebele",code:"nr"},{name:"Ndonga",code:"ng"},{name:"Nepali",code:"ne"},{name:"Norwegian",code:"no"},{name:"Norwegian Bokmål",code:"nb"},{name:"Norwegian Nynorsk",code:"nn"},{name:"Occitan",code:"oc"},{name:"Ojibwa",code:"oj"},{name:"Oriya",code:"or"},{name:"Oromo",code:"om"},{name:"Ossetian, Ossetic",code:"os"},{name:"Pali",code:"pi"},{name:"Pashto, Pushto",code:"ps"},{name:"Persian",code:"fa"},{name:"Polish",code:"pl"},{name:"Portuguese",code:"pt"},{name:"Punjabi, Panjabi",code:"pa"},{name:"Quechua",code:"qu"},{name:"Romanian, Moldavian, Moldovan",code:"ro"},{name:"Romansh",code:"rm"},{name:"Rundi",code:"rn"},{name:"Russian",code:"ru"},{name:"Northern Sami",code:"se"},{name:"Samoan",code:"sm"},{name:"Sango",code:"sg"},{name:"Sanskrit",code:"sa"},{name:"Sardinian",code:"sc"},{name:"Serbian",code:"sr"},{name:"Shona",code:"sn"},{name:"Sindhi",code:"sd"},{name:"Sinhala, Sinhalese",code:"si"},{name:"Slovak",code:"sk"},{name:"Slovenian",code:"sl"},{name:"Somali",code:"so"},{name:"Southern Sotho",code:"st"},{name:"Spanish, Castilian",code:"es"},{name:"Sundanese",code:"su"},{name:"Swahili",code:"sw"},{name:"Swati",code:"ss"},{name:"Swedish",code:"sv"},{name:"Tagalog",code:"tl"},{name:"Tahitian",code:"ty"},{name:"Tajik",code:"tg"},{name:"Tamil",code:"ta"},{name:"Tatar",code:"tt"},{name:"Telugu",code:"te"},{name:"Thai",code:"th"},{name:"Tibetan",code:"bo"},{name:"Tigrinya",code:"ti"},{name:"Tonga (Tonga Islands)",code:"to"},{name:"Tsonga",code:"ts"},{name:"Tswana",code:"tn"},{name:"Turkish",code:"tr"},{name:"Turkmen",code:"tk"},{name:"Twi",code:"tw"},{name:"Uighur, Uyghur",code:"ug"},{name:"Ukrainian",code:"uk"},{name:"Urdu",code:"ur"},{name:"Uzbek",code:"uz"},{name:"Venda",code:"ve"},{name:"Vietnamese",code:"vi"},{name:"Volapük",code:"vo"},{name:"Walloon",code:"wa"},{name:"Welsh",code:"cy"},{name:"Wolof",code:"wo"},{name:"Xhosa",code:"xh"},{name:"Sichuan Yi, Nuosu",code:"ii"},{name:"Yiddish",code:"yi"},{name:"Yoruba",code:"yo"},{name:"Zhuang, Chuang",code:"za"},{name:"Zulu",code:"zu"}])if(a.name===e)return a.code;throw new Error("WD_Core: Unable to find the language code for "+e)}return e}function a(e,a,t){var n=t,t=e.language;if(n!==t)for(const o of a)if(o.language===n)return o;return e}function c(a){var t,n=a.length;let o=0,i=0,r="",c="Running",s="Waiting",l=!1;for(let e=0;e<n;e++)if("Waiting"===s?"Running"===c?"Running"===c&&"\\"!==a[e]||(c="Locked"):"Locked"===c?c="Locked"!==c||"V"!==a[e]&&"v"!==a[e]?"Locked"!==c||"I"!==a[e]&&"i"!==a[e]?"Locked"!==c||"N"!==a[e]&&"n"!==a[e]?"Locked"!==c||"P"!==a[e]&&"p"!==a[e]?"Locked"!==c||"G"!==a[e]&&"g"!==a[e]?"Locked"!==c||"C"!==a[e]&&"c"!==a[e]?"Locked"!==c||"{"!==a[e]&&"}"!==a[e]&&"$"!==a[e]&&"."!==a[e]&&"|"!==a[e]&&"!"!==a[e]&&">"!==a[e]&&"<"!==a[e]&&"^"!==a[e]?"Locked"===c&&"\\"===a[e]?(o-=1,"Running"):"Locked"!==c||"F"!==a[e]&&"f"!==a[e]?"Running":"FontPt1":(o-=2,"Running"):"Color":(t=TextManager.currencyUnit,o=o-2+t.length,"Running"):"PartyOrPos":"Actor":"Icon":"Variable":"Running"!==c&&"Locked"!==c&&"FontPt1"!==c&&"["===a[e]?s="Running":c="PartyOrPos"!==c||"X"!==a[e]&&"x"!==a[e]?"PartyOrPos"!==c||"Y"!==a[e]&&"y"!==a[e]?"FontPt1"!==c||"S"!==a[e]&&"s"!==a[e]?"Running":"FontSize":"PosY":"PosX":isNaN(parseInt(a[e]))?"]"===a[e]&&0===i||isNaN(parseInt(a[e]))&&"]"!==a[e]?("PosX"!==c&&"PosY"!==c&&"FontSize"!==c?o-=2:o-=3,c="Running",s="Waiting",i=0,r=""):"]"===a[e]&&0!==i&&(l=!0):(i++,r+=a[e]),l){switch(c){case"Variable":var d=$gameVariables.value(parseInt(r)).toString().length;o=o-4-i+d;break;case"Icon":o=o-4-i+2;break;case"Actor":PartyOrPos;var d=$dataActors,u=parseInt(r);o=u<=d.length-1&&0<u?(u=d[u].name,o-4-i+u.length):o-4-i;break;case"PartyOrPos":var u=$gameParty,h=$dataActors,m=parseInt(r);o=m<=h.length-1&&0<m&&u._actors.includes(m)?(h=h[m].name,o-4-i+h.length):o-4-i;break;case"Color":o=o-4-i;break;case"PosX":case"PosY":case"FontSize":o=o-5-i}c="Running",s="Waiting",i=0,r=""}return n+o}function t(a,e){var t=e.toLowerCase();if(a.includes("\n")||a.includes("↵")){var n=function(a,t){var n=[];let o=0;for(let e=0;e<a.length;e++)t.includes(a[e])&&(n.push(a.slice(o,e)),o=e+1);return o<a.length&&n.push(a.slice(o)),n}(a,["\n","↵"]);let e=0;var o=[];for(const r of n)c(r)>e&&(e=c(r));for(let a=0;a<n.length;a++)if(c(n[a])<e){var i=e-c(n[a]);switch(t){case"left":o.push(n[a]);break;case"center":for(let e=i;0<e;e--)e%2==0?n[a]=n[a]+" ":n[a]=" "+n[a];o.push(n[a]);break;case"right":for(let e=i;0<e;e--)n[a]=" "+n[a];o.push(n[a])}}else o.push(n[a]);return o.join("\n")}return a}function n(e,a,t){e.contents.fontSize=t;t=e.createTextState(a,0,0,0);return t.drawing=!1,e.processAllText(t),{width:t.outputWidth,height:t.outputHeight}}function o(e,a,t,n,o,i){e.fontSize=i,e.contents.fontSize=i;i=e.createTextState(a,t,n,o);return e.processAllText(i),i.outputWidth}window.WD_Interplugin_Core={translateData:e,forceLanguage:a,textExAligner:t,realTextDimensions:n,drawTextExSize:o,coreVersion:function(){return{major:1,minor:0,hotfix:0}}}}();