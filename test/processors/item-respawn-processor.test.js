'use strict';

import itemRespawnProcessor from '../../app/processors/item-respawn-processor.js';
import newItem from '../../app/data/items.js';

describe('item respawn processor', () => {
  const originalRoom = [newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm'), newItem('keys', 'gallows key')];
  const currentRoom = [newItem('keys', 'gallows key'), newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm')];

  describe('With a room that isn\'t missing any items', () => {
    describe('With no containers', () => {
      it('should return an empty array', () => {
        expect(itemRespawnProcessor(originalRoom, currentRoom)).toEqual({itemsToRespawn: [], itemsToRemove: []});
      });
    });

    describe('With containers', () => {
      describe('That are missing items', () => {
        describe('With no items', () => {
          it('should respawn the containers missing items with the correct items', () => {
            const backpackWithPotion = newItem('containers', 'backpack');
            backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithPotion2 = newItem('containers', 'backpack');
            backpackWithPotion2.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithPotion3 = newItem('containers', 'backpack');
            backpackWithPotion3.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithNothing = newItem('containers', 'backpack');

            const roomItems = [backpackWithPotion, backpackWithPotion2];
            const currentItems = [backpackWithPotion3, backpackWithNothing];

            expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
              itemsToRespawn: [{
                category: backpackWithPotion2.category,
                respawnContents: [{category: 'potions', name: 'health potion'}],
                name: backpackWithPotion2.name
              }],
              itemsToRemove: [{id: backpackWithNothing.id}]
            });
          });
        });

        describe('With other items existing', () => {
          it('should respawn the missing items, but keep the existing ones', () => {
            const backpackWithPotion = newItem('containers', 'backpack');
            backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithPotion2 = newItem('containers', 'backpack');
            backpackWithPotion2.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithPotion3 = newItem('containers', 'backpack');
            backpackWithPotion3.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithManaPotion = newItem('containers', 'backpack');
            backpackWithManaPotion.container.contains.push(newItem('potions', 'mana potion'));

            const roomItems = [backpackWithPotion, backpackWithPotion2];
            const currentItems = [backpackWithPotion3, backpackWithManaPotion];

            expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
              itemsToRespawn: [{
                category: backpackWithPotion2.category,
                respawnContents: [
                  {category: 'potions', name: 'health potion'},
                  {category: 'potions', name: 'mana potion'}
                ],
                name: backpackWithPotion2.name
              }],
              itemsToRemove: [{id: backpackWithManaPotion.id}]
            });
          });
        });
      });

      describe('That aren\'t missing anything', () => {
        it('should return empty arrays', () => {
          const backpackWithPotion = newItem('containers', 'backpack');
          backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion2 = newItem('containers', 'backpack');
          backpackWithPotion2.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion3 = newItem('containers', 'backpack');
          backpackWithPotion3.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion4 = newItem('containers', 'backpack');
          backpackWithPotion4.container.contains.push(newItem('potions', 'health potion'));

          const roomItems = [backpackWithPotion, backpackWithPotion2];
          const currentItems = [backpackWithPotion3, backpackWithPotion4];

          expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
            itemsToRespawn: [],
            itemsToRemove: []
          });
        });
      });
    });
  });

  describe('With a room that has extra items', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalRoom, [...currentRoom, newItem('potions', 'health potion')])).toEqual({
        itemsToRespawn: [],
        itemsToRemove: []
      });
    });
  });

  describe('With a room missing all of an original item', () => {
    describe('That aren\'t containers', () => {
      it('should respawn the correct number of items', () => {
        expect(itemRespawnProcessor(originalRoom, [newItem('keys', 'gallows key')])).toEqual({
          itemsToRespawn: [
            {
              category: 'equipment',
              name: 'leather helm'
            },
            {
              category: 'equipment',
              name: 'leather helm'
            }
          ],
          itemsToRemove: []
        });
      });
    });

    describe('With containers', () => {
      describe('With three containing the same item', () => {
        it('should spawn 3 new items with the expected contents', () => {
          const backpackWithPotion = newItem('containers', 'backpack');
          backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion2 = newItem('containers', 'backpack');
          backpackWithPotion2.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion3 = newItem('containers', 'backpack');
          backpackWithPotion3.container.contains.push(newItem('potions', 'health potion'));

          const roomItems = [backpackWithPotion, backpackWithPotion2, backpackWithPotion3];
          const currentItems = [];
          expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
            itemsToRespawn: [
              {
                category: backpackWithPotion.category,
                respawnContents: [{category: 'potions', name: 'health potion'}],
                name: backpackWithPotion.name
              },
              {
                category: backpackWithPotion.category,
                respawnContents: [{category: 'potions', name: 'health potion'}],
                name: backpackWithPotion.name
              },
              {
                category: backpackWithPotion.category,
                respawnContents: [{category: 'potions', name: 'health potion'}],
                name: backpackWithPotion.name
              }
            ],
            itemsToRemove: []
          });
        });
      });
    });
  });

  describe('With a room missing only some of the original items', () => {
    describe('Without containers', () => {
      it('should respawn the correct number of items', () => {
        expect(itemRespawnProcessor(originalRoom, [newItem('equipment', 'leather helm')])).toEqual({
          itemsToRespawn: [
            {
              category: 'equipment',
              name: 'leather helm'
            },
            {
              category: 'keys',
              name: 'gallows key'
            }
          ],
          itemsToRemove: []
        });
      });
    });

    describe('With containers', () => {
      describe('With 3 original containers, missing 2 of the original ones', () => {
        describe('With all the same item type', () => {
          const backpackWithPotion = newItem('containers', 'backpack');
          backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion2 = newItem('containers', 'backpack');
          backpackWithPotion2.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion3 = newItem('containers', 'backpack');
          backpackWithPotion3.container.contains.push(newItem('potions', 'health potion'));
          const backpackWithPotion4 = newItem('containers', 'backpack');
          backpackWithPotion4.container.contains.push(newItem('potions', 'health potion'));

          it('should return two new backpacks with the items', () => {
            const roomItems = [backpackWithPotion, backpackWithPotion2, backpackWithPotion3];
            const currentItems = [backpackWithPotion4];
            expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
              itemsToRespawn: [
                {
                  category: backpackWithPotion.category,
                  respawnContents: [{category: 'potions', name: 'health potion'}],
                  name: backpackWithPotion.name
                },
                {
                  category: backpackWithPotion2.category,
                  respawnContents: [{category: 'potions', name: 'health potion'}],
                  name: backpackWithPotion2.name
                }
              ],
              itemsToRemove: [{id: backpackWithPotion4.id}]
            });
          });
        });

        describe('With different item types', () => {
          it('should return two new backpacks with the items', () => {
            const backpackWithPotion = newItem('containers', 'backpack');
            backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithPotion4 = newItem('containers', 'backpack');
            backpackWithPotion4.container.contains.push(newItem('potions', 'health potion'));
            const backpackWithKey = newItem('containers', 'backpack');
            backpackWithKey.container.contains.push(newItem('keys', 'academy key'));
            const backpackWithSword = newItem('containers', 'backpack');
            backpackWithSword.container.contains.push(newItem('weapons', 'broad sword'));

            const roomItems = [backpackWithPotion, backpackWithKey, backpackWithSword];
            const currentItems = [backpackWithPotion4];

            expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
              itemsToRespawn: [
                {
                  category: backpackWithKey.category,
                  respawnContents: [{category: 'keys', name: 'academy key'}],
                  name: backpackWithKey.name
                },
                {
                  category: backpackWithSword.category,
                  respawnContents: [{category: 'weapons', name: 'broad sword'}],
                  name: backpackWithSword.name
                }
              ],
              itemsToRemove: [{id: backpackWithPotion4.id}]
            });
          });
        });
      });
    });
  });
});
