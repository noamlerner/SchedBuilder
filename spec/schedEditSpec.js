describe('SchedEdit',function(){
	var SchedEdit = require('../rhc/schedEdit');
	var SchedData = require('../courseData/sampleSchedData');
	var SchedPrefs = SchedData.schedule;
	var Calendar = SchedData.calendar;
	describe('addRandCourse',function(){
		var sched = [];
		it('should not mutate the existing schedule',function(){
			SchedEdit.addRandCourse(SchedPrefs, sched);
			expect(sched.length).toBe(0);
		})
		it('should add one course to the schedule',function(){
			sched = SchedEdit.addRandCourse(SchedPrefs, sched);
			expect(sched.length).toBe(1);
			sched = SchedEdit.addRandCourse(SchedPrefs, sched);
			expect(sched.length).toBe(2);
		});
		it('should have added non conflicting courses',function(){

		})
	})
});