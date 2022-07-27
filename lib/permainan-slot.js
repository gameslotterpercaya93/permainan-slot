'use babel';

import PermainanSlotView from './permainan-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  permainanSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.permainanSlotView = new PermainanSlotView(state.permainanSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.permainanSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'permainan-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.permainanSlotView.destroy();
  },

  serialize() {
    return {
      permainanSlotViewState: this.permainanSlotView.serialize()
    };
  },

  toggle() {
    console.log('PermainanSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
