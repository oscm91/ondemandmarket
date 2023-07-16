import { act } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import skillSlice, { settingSkills, resetSkills } from './reducer';
import { Skill, SkillStore } from '@ondemandmarket/models';

// Mock data
const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'Skill 1',
    description: 'This is the description for Skill 1',
    category: ['Category1', 'Category2'],
    price: 100,
    cities: ['City1', 'City2'],
    date: 1629158267,
    doers: ['Doer1', 'Doer2'],
  },
  {
    id: '2',
    name: 'Skill 2',
    description: 'This is the description for Skill 2',
    category: ['Category3', 'Category4'],
    price: 200,
    cities: ['City3', 'City4'],
    date: 1629158267,
    doers: ['Doer3', 'Doer4'],
  },
];

describe('skillSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        skill: skillSlice,
      },
    });
  });

  it('should set skills correctly', () => {
    act(() => {
      store.dispatch(settingSkills(mockSkills));
    });

    const state: SkillStore = store.getState().skill;
    expect(state.items).toEqual(mockSkills);
  });

  it('should reset skills correctly', () => {
    act(() => {
      store.dispatch(settingSkills(mockSkills));
      store.dispatch(resetSkills(undefined));
    });

    const state: SkillStore = store.getState().skill;
    expect(state).toEqual({} as SkillStore);
  });
});
