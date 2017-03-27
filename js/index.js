'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dungeon = 0;
var type = 0;
var skeletonLink = "https://dl.dropboxusercontent.com/s/qzkf7oo3613bu2z/enemy_skeleton_by_madgharr-d7945fv.gif.crdownload?dl=0";
var chestLink = 'https://dl.dropboxusercontent.com/s/3sce63c0miad68u/closed_chest-13c599d705338d4d97dadcac6ceff516.png?dl=0';
var potionLink = 'https://dl.dropboxusercontent.com/s/xve6tm8ptpbuo1b/Potion_of_Healing.png?dl=0';
var fishLink = 'https://dl.dropboxusercontent.com/s/rmfw52duocroi7v/giphy.gif.crdownload?dl=0';
var doorLink = 'https://dl.dropboxusercontent.com/s/tu71eu9zmlwamgd/Door.png?dl=0';
var bossLink = 'https://dl.dropboxusercontent.com/s/av1rei7w2w75i2i/puppix__corgi_by_ronnieraccoon-d4687hc.gif.crdownload?dl=0';

var App = function (_React$Component) {
   _inherits(App, _React$Component);

   function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.state = {
         currentmap: [],
         rooms: [{
            a: '0:0:',
            b: '59:0:',
            c: '0:32:',
            d: '59:32:'
         }],
         showshadow: true,
         health: 400,
         attack: 80,
         xp: 0,
         dungeon: 1,
         weapon: 'Knuckles',
         log: 'Find the door to next level. Dont forget to find 2 weapons on this level.',
         log_img: doorLink
      };
      return _this;
   }

   App.prototype.restart = function restart() {
      var _this2 = this;

      this.clear();
      setTimeout(function () {
         return _this2.generatemap();
      }, 100);
   };

   App.prototype.componentDidMount = function componentDidMount() {
      window.addEventListener('keydown', this.arrowclick.bind(this), true);
      this.generatemap();
   };

   App.prototype.arrowclick = function arrowclick(e) {
      var _this3 = this;

      console.log(e.which); // to get the code
      var copy = this.state.currentmap;
      var target = '';
      var interest = 0;
      switch (e.keyCode) {
         case 37:
         case 65:

            for (var x = 0; x < copy.length; x++) {
               var locale = copy[x].split(':')[2];
               if (locale == 'player' && Number(copy[x].split(':')[0]) > 0) {
                  target = x;
               }
            }
            if (target !== '') {
               var need = copy[target - 1].split(':')[2];
               switch (need) {
                  case 'boss':
                     var damagein = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target - 1].split(':')[4]);
                     var damageout = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var playerhp = Number(this.state.health);
                     var bossnexthp = Number(copy[target - 1].split(':')[3]) - damageout;
                     if (playerhp - damagein > 0) {
                        if (bossnexthp > 0) {
                           copy[target - 1] = copy[target - 1].split(':')[0] + ':' + copy[target - 1].split(':')[1] + ':' + copy[target - 1].split(':')[2] + ':' + bossnexthp + ':' + copy[target - 1].split(':')[4];
                           this.setState({
                              health: playerhp - damagein,
                              log: 'You attacked ' + 'Boss' + ' with ' + damageout + ' attack. Now his hp is ' + bossnexthp + '. Now your hp is ' + (playerhp - damagein),
                              log_img: bossLink
                           });
                        } else {
                           alert('You won this game. Congrats!!!! (Applause sounds)');
                           this.restart();
                        }
                     } else {
                        alert('You died from this cute boss. Die in peace and Try again! ^_^');
                        this.restart();
                     }

                     break;
                  case 'door':
                     dungeon++;
                     interest = 1;
                     this.generatemap();
                     if (dungeon == 2) {
                        this.setState({
                           log: 'Now you need to kill the Boss. He has 1300 HP and 200 attack, be aware with this guy. And try to find Magic sword.',
                           log_img: bossLink,
                           dungeon: 3
                        });
                     } else {
                        this.setState({
                           log: 'Find the door to next level. Dont forget to find 2 weapons on this level.',
                           log_img: doorLink,
                           dungeon: 2
                        });
                     }
                     break;
                  case 'wall':

                     break;
                  case 'potion':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target - 1] = copy[target - 1].split(':')[0] + ':' + copy[target - 1].split(':')[1] + ':' + 'player';
                     this.setState({
                        health: this.state.health + 70,
                        log_img: potionLink,
                        log: "You've taken 70 hp potion. Now your HP is " + (this.state.health + 70)
                     });
                     break;
                  case '':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target - 1] = copy[target - 1] + 'player';
                     break;
                  case 'chest':
                     var funny = copy[target - 1].split(':')[3];
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target - 1] = copy[target - 1].split(':')[0] + ':' + copy[target - 1].split(':')[1] + ':' + 'player';
                     var damage = 0;
                     switch (funny) {
                        case 'Club':
                           damage = 20;
                           break;
                        case 'Dagger':
                           damage = 50;
                           break;
                        case 'Battle axe':
                           damage = 75;
                           break;
                        case 'Longsword':
                           damage = 105;
                           break;
                        case 'Magic sword':
                           damage = 130;
                           break;
                     }
                     if (damage < this.state.attack - 80 * (Math.floor(this.state.xp / 60) + 1)) {
                        var kek = 'Not increased because you have better weapon';
                        this.setState({
                           weapon: this.state.weapon,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: this.state.attack
                        });
                     } else {
                        var kek = '+ ' + damage;
                        this.setState({
                           weapon: funny,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: (Math.floor(this.state.xp / 60) + 1) * 80 + damage
                        });
                     }
                     break;
                  case 'enemy':
                     var imglink = '';
                     var enemyname = '';
                     var enemytype = copy[target - 1].split(':')[3];
                     switch (enemytype) {
                        case '2':
                           enemyname = 'Fish';
                           imglink = fishLink;
                           break;
                        case '1':
                           enemyname = 'Skeleton';
                           imglink = skeletonLink;
                           break;
                     }

                     var damageincome = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target - 1].split(':')[5]);
                     var damageoutcome = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var yourhp = Number(this.state.health);
                     var enemynexthp = Number(copy[target - 1].split(':')[4]) - damageoutcome;
                     damageincome = Number(damageincome);
                     yourhp = Number(yourhp);

                     if (yourhp - damageincome > 0) {
                        if (enemynexthp > 0) {
                           copy[target - 1] = copy[target - 1].split(':')[0] + ':' + copy[target - 1].split(':')[1] + ':' + copy[target - 1].split(':')[2] + ':' + copy[target - 1].split(':')[3] + ':' + enemynexthp + ':' + copy[target - 1].split(':')[5];
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You attacked ' + enemyname + ' with ' + damageoutcome + ' attack. Now his hp is ' + enemynexthp + '. Now your hp is ' + (yourhp - damageincome),
                              log_img: imglink
                           });
                        } else {
                           var xper = '';
                           switch (enemyname) {
                              case 'Fish':
                                 xper = 9;
                                 break;
                              case 'Skeleton':
                                 xper = 5;
                                 break;
                           }
                           var weapondamage = 0;
                           switch (this.state.weapon) {
                              case 'Club':
                                 weapondamage = 20;
                                 break;
                              case 'Dagger':
                                 weapondamage = 50;
                                 break;
                              case 'Battle axe':
                                 weapondamage = 75;
                                 break;
                              case 'Longsword':
                                 weapondamage = 105;
                                 break;
                              case 'Magic sword':
                                 weapondamage = 130;
                                 break;
                           }
                           copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                           copy[target - 1] = copy[target - 1].split(':')[0] + ':' + copy[target - 1].split(':')[1] + ':' + 'player';
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You killed ' + enemyname + '. Now your hp is ' + (yourhp - damageincome) + '. You"ve achieved ' + xper + ' xp points.',
                              log_img: imglink,
                              xp: this.state.xp + xper,
                              attack: (Math.floor((this.state.xp + xper) / 60) + 1) * 80 + weapondamage
                           });
                        }
                     } else {
                        alert('You died');
                        this.clear();
                        setTimeout(function () {
                           return _this3.generatemap();
                        }, 100);
                     }
                     break;
               }
            }
            if (interest == 0) {
               this.setState({
                  currentmap: copy
               });
            }
            // left key pressed
            break;
         case 38:
         case 87:

            for (var x = 0; x < copy.length; x++) {
               var locale = copy[x].split(':')[2];
               if (locale == 'player' && Number(copy[x].split(':')[1]) > 0) {
                  target = x;
               }
            }
            if (target !== '') {
               var need = copy[target - 60].split(':')[2];
               switch (need) {
                  case 'boss':
                     var damagein = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target - 60].split(':')[4]);
                     var damageout = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var playerhp = Number(this.state.health);
                     var bossnexthp = Number(copy[target - 60].split(':')[3]) - damageout;
                     if (playerhp - damagein > 0) {
                        if (bossnexthp > 0) {
                           copy[target - 60] = copy[target - 60].split(':')[0] + ':' + copy[target - 60].split(':')[1] + ':' + copy[target - 60].split(':')[2] + ':' + bossnexthp + ':' + copy[target - 60].split(':')[4];
                           this.setState({
                              health: playerhp - damagein,
                              log: 'You attacked ' + 'Boss' + ' with ' + damageout + ' attack. Now his hp is ' + bossnexthp + '. Now your hp is ' + (playerhp - damagein),
                              log_img: bossLink
                           });
                        } else {
                           alert('You won this game. Congrats!!!! (Applause sounds)');
                           this.restart();
                        }
                     } else {
                        alert('You died from this cute boss. Die in peace and Try again! ^_^');
                        this.restart();
                     }

                     break;
                  case 'door':
                     dungeon++;
                     interest = 1;
                     this.generatemap();
                     if (dungeon == 2) {
                        this.setState({
                           log: 'Now you need to kill the Boss. He has 1300 HP and 200 attack, be aware with this guy. And try to find Magic sword.',
                           log_img: bossLink,
                           dungeon: 3
                        });
                     } else {
                        this.setState({
                           log: 'Find the door to next level. Dont forget to find 2 weapons on this level.',
                           log_img: doorLink,
                           dungeon: 2
                        });
                     }
                     break;
                  case 'chest':
                     var funny = copy[target - 60].split(':')[3];
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target - 60] = copy[target - 60].split(':')[0] + ':' + copy[target - 60].split(':')[1] + ':' + 'player';
                     var damage = 0;
                     switch (funny) {
                        case 'Club':
                           damage = 20;
                           break;
                        case 'Dagger':
                           damage = 50;
                           break;
                        case 'Battle axe':
                           damage = 75;
                           break;
                        case 'Longsword':
                           damage = 105;
                           break;
                        case 'Magic sword':
                           damage = 130;
                           break;
                     }
                     if (damage < this.state.attack - 80 * (Math.floor(this.state.xp / 60) + 1)) {
                        var kek = 'Not increased because you have better weapon';
                        this.setState({
                           weapon: this.state.weapon,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: this.state.attack
                        });
                     } else {
                        var kek = '+ ' + damage;
                        this.setState({
                           weapon: funny,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: (Math.floor(this.state.xp / 60) + 1) * 80 + damage
                        });
                     }
                     break;
                  case 'wall':

                     break;
                  case 'potion':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target - 60] = copy[target - 60].split(':')[0] + ':' + copy[target - 60].split(':')[1] + ':' + 'player';
                     this.setState({
                        health: this.state.health + 70,
                        log_img: potionLink,
                        log: "You've taken 70 hp potion. Now your HP is " + (this.state.health + 70)
                     });
                     break;
                  case '':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target - 60] = copy[target - 60] + 'player';
                     break;
                  case 'enemy':
                     var imglink = '';
                     var enemyname = '';
                     var enemytype = copy[target - 60].split(':')[3];
                     switch (enemytype) {
                        case '2':
                           enemyname = 'Fish';
                           imglink = fishLink;
                           break;
                        case '1':
                           enemyname = 'Skeleton';
                           imglink = skeletonLink;
                           break;
                     }

                     var damageincome = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target - 60].split(':')[5]);
                     damageincome = Number(damageincome);
                     var damageoutcome = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var yourhp = Number(this.state.health);
                     var enemynexthp = Number(copy[target - 1].split(':')[4]) - damageoutcome;
                     damageincome = Number(damageincome);
                     yourhp = Number(yourhp);

                     if (yourhp - damageincome > 0) {
                        if (enemynexthp > 0) {
                           copy[target - 60] = copy[target - 60].split(':')[0] + ':' + copy[target - 60].split(':')[1] + ':' + copy[target - 60].split(':')[2] + ':' + copy[target - 60].split(':')[3] + ':' + enemynexthp + ':' + copy[target - 60].split(':')[5];
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You attacked ' + enemyname + ' with ' + damageoutcome + ' attack. Now his hp is ' + enemynexthp + '. Now your hp is ' + (yourhp - damageincome),
                              log_img: imglink
                           });
                        } else {
                           var xper = '';
                           switch (enemyname) {
                              case 'Fish':
                                 xper = 9;
                                 break;
                              case 'Skeleton':
                                 xper = 5;
                                 break;
                           }
                           var weapondamage = 0;
                           switch (this.state.weapon) {
                              case 'Club':
                                 weapondamage = 20;
                                 break;
                              case 'Dagger':
                                 weapondamage = 50;
                                 break;
                              case 'Battle axe':
                                 weapondamage = 75;
                                 break;
                              case 'Longsword':
                                 weapondamage = 105;
                                 break;
                              case 'Magic sword':
                                 weapondamage = 130;
                                 break;
                           }
                           copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                           copy[target - 60] = copy[target - 60].split(':')[0] + ':' + copy[target - 60].split(':')[1] + ':' + 'player';
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You killed ' + enemyname + '. Now your hp is ' + (yourhp - damageincome) + '. You"ve achieved ' + xper + ' xp points.',
                              log_img: imglink,
                              xp: this.state.xp + xper,
                              attack: (Math.floor((this.state.xp + xper) / 60) + 1) * 80 + weapondamage
                           });
                        }
                     } else {
                        alert('You died');
                        this.clear();
                        setTimeout(function () {
                           return _this3.generatemap();
                        }, 100);
                     }
                     break;
               }
            }
            if (interest == 0) {
               this.setState({
                  currentmap: copy
               });
            }
            // up key pressed
            break;
         case 39:
         case 68:
            for (var x = 0; x < copy.length; x++) {
               var locale = copy[x].split(':')[2];
               if (locale == 'player' && Number(copy[x].split(':')[0]) < 59) {
                  target = x;
               }
            }
            if (target !== '') {
               var need = copy[target + 1].split(':')[2];
               switch (need) {
                  case 'boss':
                     var damagein = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target + 1].split(':')[4]);
                     var damageout = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var playerhp = Number(this.state.health);
                     var bossnexthp = Number(copy[target + 1].split(':')[3]) - damageout;
                     if (playerhp - damagein > 0) {
                        if (bossnexthp > 0) {
                           copy[target + 1] = copy[target + 1].split(':')[0] + ':' + copy[target + 1].split(':')[1] + ':' + copy[target + 1].split(':')[2] + ':' + bossnexthp + ':' + copy[target + 1].split(':')[4];
                           this.setState({
                              health: playerhp - damagein,
                              log: 'You attacked ' + 'Boss' + ' with ' + damageout + ' attack. Now his hp is ' + bossnexthp + '. Now your hp is ' + (playerhp - damagein),
                              log_img: bossLink
                           });
                        } else {
                           alert('You won this game. Congrats!!!! (Applause sounds)');
                           this.restart();
                        }
                     } else {
                        alert('You died from this cute boss. Die in peace and Try again! ^_^');
                        this.restart();
                     }

                     break;
                  case 'door':
                     dungeon++;
                     interest = 1;
                     this.generatemap();
                     if (dungeon == 2) {
                        this.setState({
                           log: 'Now you need to kill the Boss. He has 1300 HP and 200 attack, be aware with this guy. And try to find Magic sword.',
                           log_img: bossLink,
                           dungeon: 3
                        });
                     } else {
                        this.setState({
                           log: 'Find the door to next level. Dont forget to find 2 weapons on this level.',
                           log_img: doorLink,
                           dungeon: 2
                        });
                     }
                     break;
                  case 'chest':
                     var funny = copy[target + 1].split(':')[3];
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target + 1] = copy[target + 1].split(':')[0] + ':' + copy[target + 1].split(':')[1] + ':' + 'player';
                     var damage = 0;
                     switch (funny) {
                        case 'Club':
                           damage = 20;
                           break;
                        case 'Dagger':
                           damage = 50;
                           break;
                        case 'Battle axe':
                           damage = 75;
                           break;
                        case 'Longsword':
                           damage = 105;
                           break;
                        case 'Magic sword':
                           damage = 130;
                           break;
                     }
                     if (damage < this.state.attack - 80 * (Math.floor(this.state.xp / 60) + 1)) {
                        var kek = 'Not increased because you have better weapon';
                        this.setState({
                           weapon: this.state.weapon,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: this.state.attack
                        });
                     } else {
                        var kek = '+ ' + damage;
                        this.setState({
                           weapon: funny,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: (Math.floor(this.state.xp / 60) + 1) * 80 + damage
                        });
                     }
                     break;
                  case 'wall':

                     break;
                  case 'potion':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target + 1] = copy[target + 1].split(':')[0] + ':' + copy[target + 1].split(':')[1] + ':' + 'player';
                     this.setState({
                        health: this.state.health + 70,
                        log_img: potionLink,
                        log: "You've taken 70 hp potion. Now your HP is " + (this.state.health + 70)
                     });
                     break;
                  case '':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target + 1] = copy[target + 1] + 'player';
                     break;
                  case 'enemy':
                     var imglink = '';
                     var enemyname = '';
                     var enemytype = copy[target + 1].split(':')[3];
                     switch (enemytype) {
                        case '2':
                           enemyname = 'Fish';
                           imglink = fishLink;
                           break;
                        case '1':
                           enemyname = 'Skeleton';
                           imglink = skeletonLink;
                           break;
                     }

                     var damageincome = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target + 1].split(':')[5]);
                     damageincome = Number(damageincome);
                     var damageoutcome = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var yourhp = Number(this.state.health);
                     var enemynexthp = Number(copy[target + 1].split(':')[4]) - damageoutcome;
                     damageincome = Number(damageincome);
                     yourhp = Number(yourhp);

                     if (yourhp - damageincome > 0) {
                        if (enemynexthp > 0) {
                           copy[target + 1] = copy[target + 1].split(':')[0] + ':' + copy[target + 1].split(':')[1] + ':' + copy[target + 1].split(':')[2] + ':' + copy[target + 1].split(':')[3] + ':' + enemynexthp + ':' + copy[target + 1].split(':')[5];
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You attacked ' + enemyname + ' with ' + damageoutcome + ' attack. Now his hp is ' + enemynexthp + '. Now your hp is ' + (yourhp - damageincome),
                              log_img: imglink
                           });
                        } else {
                           var xper = '';
                           switch (enemyname) {
                              case 'Fish':
                                 xper = 9;
                                 break;
                              case 'Skeleton':
                                 xper = 5;
                                 break;
                           }
                           var weapondamage = 0;
                           switch (this.state.weapon) {
                              case 'Club':
                                 weapondamage = 20;
                                 break;
                              case 'Dagger':
                                 weapondamage = 50;
                                 break;
                              case 'Battle axe':
                                 weapondamage = 75;
                                 break;
                              case 'Longsword':
                                 weapondamage = 105;
                                 break;
                              case 'Magic sword':
                                 weapondamage = 130;
                                 break;
                           }
                           copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                           copy[target + 1] = copy[target + 1].split(':')[0] + ':' + copy[target + 1].split(':')[1] + ':' + 'player';
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You killed ' + enemyname + '. Now your hp is ' + (yourhp - damageincome) + '. You"ve achieved ' + xper + ' xp points.',
                              log_img: imglink,
                              xp: this.state.xp + xper,
                              attack: (Math.floor((this.state.xp + xper) / 60) + 1) * 80 + weapondamage
                           });
                        }
                     } else {
                        alert('You died');
                        this.clear();
                        setTimeout(function () {
                           return _this3.generatemap();
                        }, 100);
                     }
                     break;
               }
            }
            if (interest == 0) {
               this.setState({
                  currentmap: copy
               });
            }
            // right key pressed
            break;
         case 40:
         case 83:
            for (var x = 0; x < copy.length; x++) {
               var locale = copy[x].split(':')[2];
               if (locale == 'player' && Number(copy[x].split(':')[1]) < 32) {
                  target = x;
               }
            }
            if (target !== '') {
               var need = copy[target + 60].split(':')[2];
               switch (need) {
                  case 'boss':
                     var damagein = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target + 60].split(':')[4]);
                     var damageout = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var playerhp = Number(this.state.health);
                     var bossnexthp = Number(copy[target + 60].split(':')[3]) - damageout;
                     if (playerhp - damagein > 0) {
                        if (bossnexthp > 0) {
                           copy[target + 60] = copy[target + 60].split(':')[0] + ':' + copy[target + 60].split(':')[1] + ':' + copy[target + 60].split(':')[2] + ':' + bossnexthp + ':' + copy[target + 60].split(':')[4];
                           this.setState({
                              health: playerhp - damagein,
                              log: 'You attacked ' + 'Boss' + ' with ' + damageout + ' attack. Now his hp is ' + bossnexthp + '. Now your hp is ' + (playerhp - damagein),
                              log_img: bossLink
                           });
                        } else {
                           alert('You won this game. Congrats!!!! (Applause sounds)');
                           this.restart();
                        }
                     } else {
                        alert('You died from this cute boss. Die in peace and Try again! ^_^');
                        this.restart();
                     }

                     break;
                  case 'door':
                     dungeon++;
                     interest = 1;
                     this.generatemap();
                     if (dungeon == 2) {
                        this.setState({
                           log: 'Now you need to kill the Boss. He has 1300 HP and 200 attack, be aware with this guy. And try to find Magic sword.',
                           log_img: bossLink,
                           dungeon: 3
                        });
                     } else {
                        this.setState({
                           log: 'Find the door to next level. Dont forget to find 2 weapons on this level.',
                           log_img: doorLink,
                           dungeon: 2
                        });
                     }
                     break;
                  case 'chest':
                     var funny = copy[target + 60].split(':')[3];
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target + 60] = copy[target + 60].split(':')[0] + ':' + copy[target + 60].split(':')[1] + ':' + 'player';
                     var damage = 0;
                     switch (funny) {
                        case 'Club':
                           damage = 20;
                           break;
                        case 'Dagger':
                           damage = 50;
                           break;
                        case 'Battle axe':
                           damage = 75;
                           break;
                        case 'Longsword':
                           damage = 105;
                           break;
                        case 'Magic sword':
                           damage = 130;
                           break;
                     }
                     if (damage < this.state.attack - 80 * (Math.floor(this.state.xp / 60) + 1)) {
                        var kek = 'Not increased because you have better weapon';
                        this.setState({
                           weapon: this.state.weapon,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: this.state.attack
                        });
                     } else {
                        var kek = '+ ' + damage;
                        this.setState({
                           weapon: funny,
                           log_img: chestLink,
                           log: "You've found a " + funny + " in a chest. Damage: " + kek,
                           attack: (Math.floor(this.state.xp / 60) + 1) * 80 + damage
                        });
                     }

                     break;
                  case 'wall':

                     break;
                  case 'potion':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target + 60] = copy[target + 60].split(':')[0] + ':' + copy[target + 60].split(':')[1] + ':' + 'player';
                     this.setState({
                        health: this.state.health + 70,
                        log_img: potionLink,
                        log: "You've taken 70 hp potion. Now your HP is " + (this.state.health + 70)
                     });
                     break;
                  case '':
                     copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                     copy[target + 60] = copy[target + 60] + 'player';
                     break;
                  case 'enemy':
                     var imglink = '';
                     var enemyname = '';
                     var enemytype = copy[target + 60].split(':')[3];
                     switch (enemytype) {
                        case '2':
                           enemyname = 'Fish';
                           imglink = fishLink;
                           break;
                        case '1':
                           enemyname = 'Skeleton';
                           imglink = skeletonLink;
                           break;
                     }

                     var damageincome = Number(Math.floor(Math.random() * 10) - 5) + Number(copy[target + 60].split(':')[5]);
                     damageincome = Number(damageincome);
                     var damageoutcome = Math.floor(Math.random() * 10) - 5 + this.state.attack;
                     var yourhp = Number(this.state.health);
                     var enemynexthp = Number(copy[target + 60].split(':')[4]) - damageoutcome;
                     damageincome = Number(damageincome);
                     yourhp = Number(yourhp);

                     if (yourhp - damageincome > 0) {
                        if (enemynexthp > 0) {
                           copy[target + 60] = copy[target + 60].split(':')[0] + ':' + copy[target + 60].split(':')[1] + ':' + copy[target + 60].split(':')[2] + ':' + copy[target + 60].split(':')[3] + ':' + enemynexthp + ':' + copy[target + 60].split(':')[5];
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You attacked ' + enemyname + ' with ' + damageoutcome + ' attack. Now his hp is ' + enemynexthp + '. Now your hp is ' + (yourhp - damageincome),
                              log_img: imglink
                           });
                        } else {
                           var xper = '';
                           switch (enemyname) {
                              case 'Fish':
                                 xper = 9;
                                 break;
                              case 'Skeleton':
                                 xper = 5;
                                 break;
                           }
                           var weapondamage = 0;
                           switch (this.state.weapon) {
                              case 'Club':
                                 weapondamage = 20;
                                 break;
                              case 'Dagger':
                                 weapondamage = 50;
                                 break;
                              case 'Battle axe':
                                 weapondamage = 75;
                                 break;
                              case 'Longsword':
                                 weapondamage = 105;
                                 break;
                              case 'Magic sword':
                                 weapondamage = 130;
                                 break;
                           }
                           copy[target] = copy[target].split(':')[0] + ':' + copy[target].split(':')[1] + ':';
                           copy[target + 60] = copy[target + 60].split(':')[0] + ':' + copy[target + 60].split(':')[1] + ':' + 'player';
                           this.setState({
                              health: yourhp - damageincome,
                              log: 'You killed ' + enemyname + '. Now your hp is ' + (yourhp - damageincome) + '. You"ve achieved ' + xper + ' xp points.',
                              log_img: imglink,
                              xp: this.state.xp + xper,
                              attack: (Math.floor((this.state.xp + xper) / 60) + 1) * 80 + weapondamage
                           });
                        }
                     } else {
                        alert('You died');
                        this.clear();
                        setTimeout(function () {
                           return _this3.generatemap();
                        }, 100);
                     }
                     break;
               }
            }
            if (interest == 0) {
               this.setState({
                  currentmap: copy
               });
            }
            // down key pressed
            break;
      }
   };

   App.prototype.handledark = function handledark() {
      this.setState({
         showshadow: !this.state.showshadow
      });
   };

   App.prototype.clear = function clear() {
      dungeon = 0;
      this.setState({
         currentmap: [],
         rooms: [{
            a: '0:0:',
            b: '59:0:',
            c: '0:32:',
            d: '59:32:'
         }],
         showshadow: true,
         health: 300,
         attack: 80,
         xp: 0,
         dungeon: 1,
         weapon: 'Knuckles',
         log: 'Find the door to next level. Dont forget to find 2 weapons on this level.',
         log_img: doorLink
      });
   };

   App.prototype.generatemap = function generatemap() {
      var mean = [];
      for (var _y = 0; _y < 33; _y++) {
         for (var _x = 0; _x < 60; _x++) {
            var kek = '';
            mean.push(_x + ':' + _y + ':' + kek);
         }
      }
      var roomcopy = [{
         a: '0:0:',
         b: '59:0:',
         c: '0:32:',
         d: '59:32:'
      }];
      for (var i = 0; i < 4; i++) {
         var newpaste = [];
         for (var x = 0; x < roomcopy.length; x++) {
            var scale = Math.floor((Math.random() / 3 + 0.3) * 100) / 100;

            var _copy = roomcopy[x];
            var where = Math.floor(Math.random() * 3);
            var highy = Number(roomcopy[x].a.split(':')[1]);
            var lowy = Number(roomcopy[x].c.split(':')[1]);
            var leftx = Number(roomcopy[x].a.split(':')[0]);
            var rightx = Number(roomcopy[x].b.split(':')[0]);

            var a1 = undefined,
                b1 = undefined,
                c1 = undefined,
                d1 = undefined,
                a2 = undefined,
                b2 = undefined,
                c2 = undefined,
                d2 = undefined;
            if (where !== 0) {
               var dis = rightx - leftx;
               if (dis > 6) {
                  dis = Math.floor(scale * dis);
                  a1 = leftx + ':' + highy + ':';
                  b1 = dis + leftx + ':' + highy + ':';
                  c1 = leftx + ':' + lowy + ':';
                  d1 = dis + leftx + ':' + lowy + ':';
                  newpaste.push({
                     a: a1,
                     b: b1,
                     c: c1,
                     d: d1
                  });
                  a2 = dis + leftx + ':' + highy + ':';
                  b2 = rightx + ':' + highy + ':';
                  c2 = dis + leftx + ':' + lowy + ':';
                  d2 = rightx + ':' + lowy + ':';
                  newpaste.push({
                     a: a2,
                     b: b2,
                     c: c2,
                     d: d2
                  });
               }
            } else {
               var dis = lowy - highy;
               if (dis > 6) {
                  dis = Math.floor(scale * dis);
                  a1 = leftx + ':' + highy + ':';
                  b1 = rightx + ':' + highy + ':';
                  c1 = leftx + ':' + (dis + highy) + ':';
                  d1 = rightx + ':' + (dis + highy) + ':';
                  newpaste.push({
                     a: a1,
                     b: b1,
                     c: c1,
                     d: d1
                  });
                  a2 = leftx + ':' + (dis + highy) + ':';
                  b2 = rightx + ':' + (dis + highy) + ':';
                  c2 = leftx + ':' + lowy + ':';
                  d2 = rightx + ':' + lowy + ':';
                  newpaste.push({
                     a: a2,
                     b: b2,
                     c: c2,
                     d: d2
                  });
               }
            }
         }
         roomcopy = newpaste;
      }
      var copy = mean;
      var rooms = roomcopy;
      for (var x = 0; x < rooms.length; x++) {
         var lowery = Number(rooms[x].a.split(':')[1]);
         var uppery = Number(rooms[x].c.split(':')[1]);
         var leftx = Number(rooms[x].a.split(':')[0]);
         var rightx = Number(rooms[x].b.split(':')[0]);
         for (var y = 0; y < copy.length; y++) {
            var localex = Number(copy[y].split(':')[0]);
            var localey = Number(copy[y].split(':')[1]);
            if (copy[y].split(':')[2] !== 'wall') {
               if (localex >= leftx && localex <= rightx && localey == uppery) {
                  copy[y] = copy[y] + 'wall';
               } else if (localex >= leftx && localex <= rightx && localey == lowery) {
                  copy[y] = copy[y] + 'wall';
               } else if (localey >= lowery && localey <= uppery && localex == leftx) {
                  copy[y] = copy[y] + 'wall';
               } else if (localey >= lowery && localey <= uppery && localex == rightx) {
                  copy[y] = copy[y] + 'wall';
               }
            }
         }
      }

      copy = copy;
      for (var x = 0; x < rooms.length; x++) {
         var a = rooms[x].a;
         var b = rooms[x].b;
         var c = rooms[x].c;
         var d = rooms[x].d;
         var top = Number(b.split(':')[0]) - Number(a.split(':')[0]) - 2;
         top = Math.floor(Math.random() * top) + 1;
         top = top + Number(a.split(':')[0]) + ':' + b.split(':')[1] + ':';
         var bottom = Number(d.split(':')[0]) - Number(c.split(':')[0]) - 2;
         bottom = Math.floor(Math.random() * bottom) + 1;
         bottom = bottom + Number(c.split(':')[0]) + ':' + d.split(':')[1] + ':';

         var left = Number(c.split(':')[1]) - Number(a.split(':')[1]) - 2;
         left = Math.floor(Math.random() * left) + 1;
         left = a.split(':')[0] + ':' + (left + Number(a.split(':')[1])) + ':';

         var right = Number(d.split(':')[1]) - Number(b.split(':')[1]) - 2;
         right = Math.floor(Math.random() * right) + 1;
         right = b.split(':')[0] + ':' + (right + Number(b.split(':')[1])) + ':';
         for (var y = 0; y < copy.length; y++) {
            var locale = copy[y].split(':')[0] + ':' + copy[y].split(':')[1] + ':';
            if (locale == top) {
               copy[y] = top;
            } else if (locale == bottom) {
               copy[y] = bottom;
            } else if (locale == left) {
               copy[y] = left;
            } else if (locale == right) {
               copy[y] = right;
            }
         }
      }

      var sorted = [];
      for (var x = 0; x < copy.length; x++) {
         if (copy[x].split(':')[2] !== 'wall') {
            sorted.push(copy[x]);
         }
      }
      var place = Math.floor(Math.random() * sorted.length);
      var target = sorted[place];

      for (var y = 0; y < copy.length; y++) {

         var locale = copy[y].split(':')[0] + ':' + copy[y].split(':')[1] + ':';
         if (locale == target) {
            copy[y] = target + 'player';
         }
      }

      var num = 0;
      if (dungeon == 0 || dungeon == 1) {
         num = 2;
      } else {
         num = 1;
      }
      for (var z = 0; z < num; z++) {
         sorted = [];
         for (var x = 0; x < copy.length; x++) {
            if (copy[x].split(':')[2] !== 'wall' && copy[x].split(':')[2] !== 'chest' && copy[x].split(':')[2] !== 'player') {
               sorted.push(copy[x]);
            }
         }

         var _place = Math.floor(Math.random() * sorted.length);
         var _target = sorted[_place];
         for (var y = 0; y < copy.length; y++) {

            var locale = copy[y].split(':')[0] + ':' + copy[y].split(':')[1] + ':';
            if (locale == _target) {
               var extra = '';
               if (dungeon == 0) {
                  if (type < 2) {
                     switch (type) {
                        case 0:
                           extra = 'Club';
                           break;
                        case 1:
                           extra = 'Dagger';
                           break;
                     }
                     type++;
                  }
               } else if (dungeon == 1) {
                  if (type < 4) {
                     switch (type) {
                        case 2:
                           extra = 'Battle axe';
                           break;
                        case 3:
                           extra = 'Longsword';
                           break;
                     }
                     type++;
                  }
               } else if (dungeon == 2) {
                  if (type < 5) {
                     switch (type) {
                        case 4:
                           extra = 'Magic sword';
                           break;
                     }
                     type++;
                  }
               }
               copy[y] = _target + 'chest:' + extra;
            }
         }
      }

      for (var z = 0; z < 25; z++) {
         sorted = [];
         for (var x = 0; x < copy.length; x++) {
            if (copy[x].split(':')[2] !== 'wall' && copy[x].split(':')[2] !== 'chest' && copy[x].split(':')[2] !== 'player' && copy[x].split(':')[2] !== 'enemy') {
               sorted.push(copy[x]);
            }
         }

         var _place2 = Math.floor(Math.random() * sorted.length);
         var _target2 = sorted[_place2];
         for (var y = 0; y < copy.length; y++) {

            var locale = copy[y].split(':')[0] + ':' + copy[y].split(':')[1] + ':';
            if (locale == _target2) {
               var extra = Math.floor(Math.random() * 2);
               var lol = '';
               if (extra == 0) {
                  lol = '1:150:20';
               } else {
                  lol = '2:300:30';
               }
               copy[y] = _target2 + 'enemy:' + lol;
               console.log(copy[y]);
            }
         }
      }
      for (var z = 0; z < 25; z++) {
         sorted = [];
         for (var x = 0; x < copy.length; x++) {
            if (copy[x].split(':')[2] !== 'wall' && copy[x].split(':')[2] !== 'chest' && copy[x].split(':')[2] !== 'player' && copy[x].split(':')[2] !== 'enemy' && copy[x].split(':')[2] !== 'potion') {
               sorted.push(copy[x]);
            }
         }

         var _place3 = Math.floor(Math.random() * sorted.length);
         var _target3 = sorted[_place3];
         for (var y = 0; y < copy.length; y++) {

            var locale = copy[y].split(':')[0] + ':' + copy[y].split(':')[1] + ':';
            if (locale == _target3) {
               copy[y] = _target3 + 'potion';
               console.log(copy[y]);
            }
         }
      }

      sorted = [];
      for (var x = 0; x < copy.length; x++) {
         if (copy[x].split(':')[2] !== 'wall' && copy[x].split(':')[2] !== 'chest' && copy[x].split(':')[2] !== 'player' && copy[x].split(':')[2] !== 'enemy' && copy[x].split(':')[2] !== 'potion') {
            sorted.push(copy[x]);
         }
      }

      place = Math.floor(Math.random() * sorted.length);
      target = sorted[place];
      for (var y = 0; y < copy.length; y++) {

         var locale = copy[y].split(':')[0] + ':' + copy[y].split(':')[1] + ':';
         if (locale == target) {
            if (dungeon == 0 || dungeon == 1) {
               copy[y] = target + 'door';
               console.log(copy[y]);
            } else {
               copy[y] = target + 'boss:1300:200';
               console.log(copy[y]);
            }
         }
      }

      this.setState({
         currentmap: copy
      });
   };

   App.prototype.render = function render() {
      var _this4 = this;

      var map = this.state.currentmap.map(function (item, i) {
         var copy = item.split(':');
         var value = copy[2];
         var extra = '';
         switch (value) {
            case 'wall':
               extra = 'wall';
               break;
            case 'player':
               extra = 'player';
               break;
            case 'chest':
               extra = 'chest';
               break;
            case 'enemy':
               var xx = undefined;
               if (copy[3] == '2') {
                  xx = '2';
               } else {
                  xx = '1';
               }
               extra = 'enemy' + xx;
               break;
            case 'potion':
               extra = 'potion';
               break;
            case 'door':
               extra = 'door';
               break;
            case 'boss':
               extra = 'boss';
               break;
         }

         return React.createElement('div', { key: i, className: "cell" + ' ' + extra });
      });
      var shadowarray = this.state.currentmap;
      var place = '';
      var row = '';
      for (var x = 0; x < shadowarray.length; x++) {
         var value = shadowarray[x].split(':')[2];
         if (value == 'player') {
            place = x;
            row = Number(shadowarray[x].split(':')[1]);
         }
      }
      var shadowlinux = this.state.currentmap.map(function (item, i) {
         var extra = 'chess';
         if (i > place - 243 && i < place - 237 && item.split(':')[1] == (row - 4).toString() || i > place - 184 && i < place - 176 && item.split(':')[1] == (row - 3).toString() || i > place - 125 && i < place - 115 && item.split(':')[1] == (row - 2).toString() || i > place - 65 && i < place - 55 && item.split(':')[1] == (row - 1).toString() || i > place - 5 && i < place + 5 && item.split(':')[1] == row || i < place + 65 && i > place + 55 && item.split(':')[1] == (row + 1).toString() || i < place + 125 && i > place + 115 && item.split(':')[1] == (row + 2).toString() || i < place + 184 && i > place + 176 && item.split(':')[1] == (row + 3).toString() || i < place + 243 && i > place + 237 && item.split(':')[1] == (row + 4).toString()) {
            extra = '';
         }
         return React.createElement('div', { key: i, className: 'shadowcell' + ' ' + extra });
      });
      var shadow = this.state.currentmap.map(function (item, i) {
         var extra = 'chess';
         if (i > place - 243 && i < place - 237 && item.split(':')[1] == (row - 4).toString() || i > place - 184 && i < place - 176 && item.split(':')[1] == (row - 3).toString() || i > place - 125 && i < place - 115 && item.split(':')[1] == (row - 2).toString() || i > place - 65 && i < place - 55 && item.split(':')[1] == (row - 1).toString() || i > place - 5 && i < place + 5 && item.split(':')[1] == row || i < place + 65 && i > place + 55 && item.split(':')[1] == (row + 1).toString() || i < place + 125 && i > place + 115 && item.split(':')[1] == (row + 2).toString() || i < place + 184 && i > place + 176 && item.split(':')[1] == (row + 3).toString() || i < place + 243 && i > place + 237 && item.split(':')[1] == (row + 4).toString()) {
            extra = '';
         } else if (item.split(':')[2] !== 'wall') {
            extra = 'cell';
         } else {
            extra = 'wall';
         }
         return React.createElement('div', { key: i, className: 'shadowcell' + ' ' + extra });
      });
      var info = React.createElement(
         'div',
         null,
         'Health: ',
         this.state.health,
         React.createElement('br', null),
         'XP to next level: ',
         60 - this.state.xp % 60,
         React.createElement('br', null),
         'Attack: ',
         this.state.attack,
         React.createElement('br', null),
         'Weapon: ',
         this.state.weapon,
         React.createElement('br', null),
         'Dungeon: ',
         this.state.dungeon
      );

      var log = React.createElement(
         'div',
         { id: 'log-info', className: 'text-left' },
         this.state.log
      );
      var image = React.createElement('img', { src: this.state.log_img, id: 'log_img' });
      return React.createElement(
         'div',
         null,
         React.createElement(
            'div',
            { id: 'playerbox' },
            React.createElement(
               'div',
               { id: 'player', className: 'row text-left' },
               React.createElement('div', { id: 'playerimage' }),
               React.createElement(
                  'div',
                  { id: 'playerinfo' },
                  info
               ),
               React.createElement(
                  'div',
                  { id: 'lvlinfo', className: 'text-center' },
                  'Level: ',
                  Math.floor(this.state.xp / 60) + 1
               )
            ),
            React.createElement(
               'div',
               { id: 'log' },
               this.state.log_img != '' ? image : null,
               log,
               React.createElement(
                  'button',
                  { className: 'btn btn-warning', onClick: function onClick() {
                        return _this4.handledark();
                     }, id: 'toggle' },
                  React.createElement('span', { className: 'glyphicon glyphicon-flag' }),
                  ' Toggle Darkness'
               ),
               React.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: function onClick() {
                        return _this4.restart();
                     }, id: 'restart' },
                  React.createElement('span', { className: 'glyphicon glyphicon-repeat' }),
                  ' Restart Game'
               ),
               React.createElement(
                  'p',
                  { id: 'title' },
                  'React Roguelike by ',
                  React.createElement(
                     'a',
                     { href: 'https://www.github.com/zooll8', target: '_blank' },
                     'Zooll'
                  )
               )
            )
         ),
         React.createElement(
            'div',
            { id: 'shadowlinux' },
            this.state.showshadow ? shadowlinux : null
         ),
         React.createElement(
            'div',
            { id: 'shadow' },
            this.state.showshadow ? shadow : null
         ),
         React.createElement(
            'div',
            { id: 'main' },
            map
         ),
         React.createElement('br', null)
      );
   };

   return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));