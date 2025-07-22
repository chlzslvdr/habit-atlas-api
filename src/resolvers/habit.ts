export const habitResolvers = {
  Query: {
    habits: async (_: any, __: any, { supabase, user }: any) => {
      if (!user) throw new Error('Unauthorized');

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    createHabit: async (_: any, { name, frequency }: any, { supabase, user }: any) => {
      if (!user) throw new Error('Unauthorized');

      const { data, error } = await supabase
        .from('habits')
        .insert([{ name, frequency, user_id: user.id }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error('Insert failed, no data returned');

      return data;
    },

    markHabitComplete: async (_: any, { habitId, date }: any, { supabase, user }: any) => {
      if (!user) throw new Error('Unauthorized');

      const { data: habit, error } = await supabase
        .from('habits')
        .select('*')
        .eq('id', habitId)
        .eq('user_id', user.id)
        .single();

      if (error) throw new Error(error.message);
      if (!habit) throw new Error('Habit not found or unauthorized');

      const updatedDates = Array.isArray(habit.completed_dates)
        ? [...habit.completed_dates, date]
        : [date];

      const { data: updatedHabit, error: updateError } = await supabase
        .from('habits')
        .update({ completed_dates: updatedDates })
        .eq('id', habitId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);
      if (!updatedHabit) throw new Error('Update failed');

      return updatedHabit;
    },
  },
};
