import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skill, SkillStore } from '@ondemandmarket/models';

export const skillSlice = createSlice({
  name: 'skill',
  initialState: {} as SkillStore,
  reducers: {
    settingSkills: (state, action: PayloadAction<Skill[]>) => {
      const skills = action.payload;
      return {
        ...state,
        items: skills,
      };
    },
    resetSkills: (state, action: PayloadAction<undefined>) => {
      return {} as SkillStore;
    },
  },
});

export const { settingSkills, resetSkills } = skillSlice.actions;
export default skillSlice.reducer;
