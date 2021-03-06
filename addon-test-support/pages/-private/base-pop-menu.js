import Ceibo from 'ceibo';

import PageObject, { attribute, hasClass } from 'ember-classy-page-object';
import { findElement } from 'ember-classy-page-object/extend';

/**
 * Base test page-object for adde-tooltip, adde-popover, adde-dropdown, and adde-sub-dropdown.
 * Allows testers to open ond close the popover and select its content, as well as check
 * its current state.
 */
export default PageObject.extend({
  /**
   * Opens the popover using the method provided by the subclass on the trigger element
   *
   * @param {*} params - parameters to be passed forward
   */
  open(...params) {
    return this.trigger.open(...params);
  },

  /**
   * Closes the popover using the method provided by the subclass on the trigger element
   *
   * @param {*} params - parameters to be passed forward
   */
  close(...params) {
    return this.trigger.close(...params);
  },

  /**
   * Returns whether or not the popover is open
   */
  get isOpen() {
    return this.content.isPresent;
  },

  /**
   * Scope for the trigger element of the popover
   */
  trigger: {
    resetScope: true,
    get scope() {
      let parent = findElement(Ceibo.parent(this));

      // The parent may not be rendered either, so we can only grab the ID if it exists
      let parentId = parent ? parent.getAttribute('id') : 'unrendered';

      return `[data-popover-trigger="${parentId}"]`;
    },

    /**
     * Returns whether or not the trigger has been marked as active
     */
    isActive: hasClass('is-active'),

    hasAriaPopup: attribute('aria-haspopup'),

    isAriaExpanded: attribute('aria-expanded'),

    hasAriaDescribedBy: attribute('aria-describedby')
  },

  /**
   * Scope for the content element of the popover
   */
  content: {
    resetScope: true,
    get scope() {
      let parent = findElement(Ceibo.parent(this));

      // The parent may not be rendered either, so we can only grab the ID if it exists
      let parentId = parent ? parent.getAttribute('id') : 'unrendered';

      return `[data-popover-content="${parentId}"]`;
    },

    /**
     * Returns the placement of the popover's content based on its attribute
     */
    placement: attribute('x-placement')
  }
});

