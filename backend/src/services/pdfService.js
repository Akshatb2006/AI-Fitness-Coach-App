const PDFDocument = require('pdfkit');

class PDFService {
  generatePlanPDF(userData, plan) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        doc.fontSize(24).font('Helvetica-Bold')
           .text('AI FITNESS COACH', { align: 'center' });
        doc.fontSize(14).font('Helvetica')
           .text('Personalized Fitness Plan', { align: 'center' });
        doc.moveDown(2);

        doc.fontSize(16).font('Helvetica-Bold').text('User Profile');
        doc.fontSize(11).font('Helvetica');
        doc.text(`Name: ${userData.name}`);
        doc.text(`Age: ${userData.age} | Gender: ${userData.gender}`);
        doc.text(`Height: ${userData.height}cm | Weight: ${userData.weight}kg`);
        doc.text(`Goal: ${userData.fitnessGoal.replace('_', ' ')}`);
        doc.text(`Level: ${userData.fitnessLevel}`);
        doc.moveDown(2);

        doc.fontSize(16).font('Helvetica-Bold').text('Weekly Workout Plan');
        doc.moveDown(0.5);

        if (plan.workout?.days) {
          plan.workout.days.forEach(day => {
            doc.fontSize(12).font('Helvetica-Bold')
               .text(`${day.day} - ${day.focus}`);
            day.exercises.forEach(ex => {
              doc.fontSize(10).font('Helvetica')
                 .text(`  • ${ex.name}: ${ex.sets}x${ex.reps} (Rest: ${ex.rest})`);
            });
            doc.moveDown(0.5);
          });
        }
        doc.moveDown();

        doc.addPage();
        doc.fontSize(16).font('Helvetica-Bold').text('Daily Diet Plan');
        doc.moveDown(0.5);

        if (plan.diet?.meals) {
          Object.entries(plan.diet.meals).forEach(([meal, data]) => {
            doc.fontSize(12).font('Helvetica-Bold')
               .text(`${meal.charAt(0).toUpperCase() + meal.slice(1)} (${data.calories} cal)`);
            data.items.forEach(item => {
              doc.fontSize(10).font('Helvetica').text(`  • ${item}`);
            });
            doc.moveDown(0.3);
          });
        }

        doc.moveDown();
        doc.fontSize(12).font('Helvetica-Bold')
           .text(`Total Daily Calories: ${plan.diet?.totalCalories || 'N/A'}`);
        doc.fontSize(10).font('Helvetica')
           .text(`Macros: Protein ${plan.diet?.macros?.protein} | Carbs ${plan.diet?.macros?.carbs} | Fats ${plan.diet?.macros?.fats}`);

        // Tips
        doc.moveDown(2);
        doc.fontSize(16).font('Helvetica-Bold').text('Personalized Tips');
        doc.moveDown(0.5);

        if (plan.tips) {
          plan.tips.forEach((tip, i) => {
            const tipText = typeof tip === 'object' ? tip.tip : tip;
            doc.fontSize(10).font('Helvetica').text(`${i + 1}. ${tipText}`);
          });
        }

        doc.moveDown(2);
        doc.fontSize(12).font('Helvetica-Oblique')
           .text(`"${plan.quote}"`, { align: 'center' });

        doc.moveDown(2);
        doc.fontSize(8).font('Helvetica')
           .text(`Generated on ${new Date().toLocaleDateString()}`, { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new PDFService();