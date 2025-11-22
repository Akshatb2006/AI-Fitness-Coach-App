const pdfService = require('../services/pdfService');

class ExportController {
  async exportPDF(req, res, next) {
    try {
      const { userData, plan } = req.body;

      if (!userData || !plan) {
        return res.status(400).json({ 
          success: false, 
          error: 'User data and plan are required' 
        });
      }

      const pdfBuffer = await pdfService.generatePlanPDF(userData, plan);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="fitness-plan-${userData.name || 'user'}.pdf"`,
        'Content-Length': pdfBuffer.length
      });
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExportController();