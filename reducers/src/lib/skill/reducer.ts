import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skill, SkillStore } from '@cocodemy/models';

export const skillSlice = createSlice({
  name: 'skill',
  initialState: {} as SkillStore,
  reducers: {
    settingSkills: (state, action: PayloadAction<Skill[]>) => {
      const skills = action.payload;
      return {
        ...state,
        items: skills,
      }
    },
  },
});

export const { settingSkills } = skillSlice.actions;
export default skillSlice.reducer;
