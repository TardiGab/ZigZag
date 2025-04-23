/*:
 * @target MZ
 * @plugindesc Retire le bouton "Escape" du menu de combat.
 * @help Ce plugin enlève la commande "Escape" du menu de combat.
 */

(() => {
    const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
      this.addCommand(TextManager.fight,  'fight');
      // this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
      // Ligne ci-dessus commentée pour retirer "Escape"
    };
  })();
  