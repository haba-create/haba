const fs = require('fs').promises;
const path = require('path');
const officegen = require('officegen');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const htmlPdf = require('html-pdf-node');

class DocumentConverterService {
  constructor() {
    this.outputDir = path.join(__dirname, '../../generated_documents');
    this.ensureOutputDir();
  }

  async ensureOutputDir() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error('Error creating output directory:', error);
    }
  }

  async convertToPDF(documentData, outputFilename) {
    try {
      // Generate HTML from document data
      const html = this.generateHTML(documentData);
      
      // Convert HTML to PDF
      const options = { 
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      };
      
      const file = { content: html };
      const pdfBuffer = await htmlPdf.generatePdf(file, options);
      
      const outputPath = path.join(this.outputDir, `${outputFilename}.pdf`);
      await fs.writeFile(outputPath, pdfBuffer);
      
      return {
        success: true,
        path: outputPath,
        filename: `${outputFilename}.pdf`,
        format: 'pdf'
      };
    } catch (error) {
      console.error('Error converting to PDF:', error);
      throw error;
    }
  }

  async convertToWord(documentData, outputFilename) {
    try {
      const docx = officegen('docx');
      
      // Add document properties
      docx.setDocSubject(documentData.title || 'Document');
      docx.setDocKeywords(['HABA', documentData.type, documentData.client].filter(Boolean));
      docx.setDocCategory(documentData.type || 'Document');
      
      // Add content
      if (documentData.sections && Array.isArray(documentData.sections)) {
        for (const section of documentData.sections) {
          // Add section title
          const titleObj = docx.createP();
          titleObj.addText(section.title || section.section_title || 'Section', {
            bold: true,
            font_size: 16,
            font_face: 'Arial'
          });
          
          // Add section content
          if (section.content) {
            const content = Array.isArray(section.content) 
              ? section.content 
              : [section.content];
            
            for (const paragraph of content) {
              const pObj = docx.createP();
              pObj.addText(String(paragraph), {
                font_size: 11,
                font_face: 'Arial'
              });
            }
          }
          
          // Add subsections
          if (section.subsections) {
            for (const subsection of section.subsections) {
              const subTitleObj = docx.createP();
              subTitleObj.addText(subsection.title, {
                bold: true,
                font_size: 14,
                font_face: 'Arial'
              });
              
              if (subsection.content) {
                const subContent = Array.isArray(subsection.content)
                  ? subsection.content
                  : [subsection.content];
                
                for (const paragraph of subContent) {
                  const pObj = docx.createP();
                  pObj.addText(String(paragraph), {
                    font_size: 11,
                    font_face: 'Arial'
                  });
                }
              }
            }
          }
          
          // Add page break between major sections
          docx.putPageBreak();
        }
      } else if (documentData.content) {
        // Handle simple content structure
        const pObj = docx.createP();
        pObj.addText(JSON.stringify(documentData.content, null, 2), {
          font_size: 11,
          font_face: 'Courier New'
        });
      }
      
      // Generate the document
      const outputPath = path.join(this.outputDir, `${outputFilename}.docx`);
      
      return new Promise((resolve, reject) => {
        const out = require('fs').createWriteStream(outputPath);
        
        out.on('error', reject);
        
        docx.generate(out, {
          finalize: async (written) => {
            console.log(`Document created: ${written} bytes`);
            resolve({
              success: true,
              path: outputPath,
              filename: `${outputFilename}.docx`,
              format: 'docx',
              size: written
            });
          },
          error: reject
        });
      });
    } catch (error) {
      console.error('Error converting to Word:', error);
      throw error;
    }
  }

  async convertToPowerPoint(documentData, outputFilename) {
    try {
      const pptx = officegen('pptx');
      
      // Title slide
      let slide = pptx.makeNewSlide();
      slide.name = 'Title Slide';
      slide.back = { type: 'solid', color: '000000' };
      
      slide.addText(documentData.title || `${documentData.client} - ${documentData.projectName}`, {
        x: 'c',
        y: '40%',
        cx: '80%',
        font_size: 44,
        bold: true,
        color: 'ffffff',
        align: 'center'
      });
      
      slide.addText(documentData.author || 'HABA Consulting', {
        x: 'c',
        y: '60%',
        cx: '80%',
        font_size: 24,
        color: 'cccccc',
        align: 'center'
      });
      
      // Content slides
      if (documentData.sections && Array.isArray(documentData.sections)) {
        for (const section of documentData.sections) {
          slide = pptx.makeNewSlide();
          slide.name = section.title || 'Content';
          
          // Slide title
          slide.addText(section.title || section.section_title || 'Section', {
            x: 'c',
            y: 60,
            cx: '90%',
            font_size: 32,
            bold: true,
            color: '000000',
            align: 'center'
          });
          
          // Slide content
          if (section.content) {
            const content = Array.isArray(section.content)
              ? section.content
              : [section.content];
            
            let yPos = 150;
            for (const item of content.slice(0, 5)) { // Limit items per slide
              slide.addText(`• ${String(item)}`, {
                x: 50,
                y: yPos,
                cx: '85%',
                font_size: 18,
                color: '333333'
              });
              yPos += 40;
            }
          }
        }
      } else if (documentData.slides) {
        // Handle PowerPoint-specific structure
        for (const slideData of documentData.slides) {
          slide = pptx.makeNewSlide();
          slide.name = slideData.title || 'Slide';
          
          slide.addText(slideData.title, {
            x: 'c',
            y: 60,
            cx: '90%',
            font_size: 32,
            bold: true,
            color: '000000',
            align: 'center'
          });
          
          if (slideData.content) {
            const content = Array.isArray(slideData.content)
              ? slideData.content
              : [slideData.content];
            
            let yPos = 150;
            for (const item of content) {
              slide.addText(`• ${String(item)}`, {
                x: 50,
                y: yPos,
                cx: '85%',
                font_size: 18,
                color: '333333'
              });
              yPos += 40;
            }
          }
        }
      }
      
      // Thank you slide
      slide = pptx.makeNewSlide();
      slide.name = 'Thank You';
      slide.back = { type: 'solid', color: '000000' };
      
      slide.addText('Thank You', {
        x: 'c',
        y: '45%',
        cx: '80%',
        font_size: 48,
        bold: true,
        color: 'ffffff',
        align: 'center'
      });
      
      // Generate the presentation
      const outputPath = path.join(this.outputDir, `${outputFilename}.pptx`);
      
      return new Promise((resolve, reject) => {
        const out = require('fs').createWriteStream(outputPath);
        
        out.on('error', reject);
        
        pptx.generate(out, {
          finalize: async (written) => {
            console.log(`Presentation created: ${written} bytes`);
            resolve({
              success: true,
              path: outputPath,
              filename: `${outputFilename}.pptx`,
              format: 'pptx',
              size: written
            });
          },
          error: reject
        });
      });
    } catch (error) {
      console.error('Error converting to PowerPoint:', error);
      throw error;
    }
  }

  async convertToExcel(documentData, outputFilename) {
    try {
      const xlsx = officegen('xlsx');
      
      // Create sheets based on document structure
      if (documentData.sheets) {
        for (const sheetData of documentData.sheets) {
          const sheet = xlsx.makeNewSheet();
          sheet.name = sheetData.name || 'Sheet';
          
          // Add headers if available
          if (sheetData.columns) {
            sheet.data[0] = sheetData.columns;
          }
          
          // Add data rows
          if (sheetData.sampleData) {
            const data = Array.isArray(sheetData.sampleData)
              ? sheetData.sampleData
              : [sheetData.sampleData];
            
            for (let i = 0; i < data.length; i++) {
              sheet.data[i + 1] = Array.isArray(data[i]) ? data[i] : [data[i]];
            }
          }
        }
      } else {
        // Create a default sheet with document data
        const sheet = xlsx.makeNewSheet();
        sheet.name = 'Document Data';
        
        // Convert document to tabular format
        sheet.data[0] = ['Property', 'Value'];
        sheet.data[1] = ['Type', documentData.type];
        sheet.data[2] = ['Client', documentData.client];
        sheet.data[3] = ['Project', documentData.projectName];
        sheet.data[4] = ['Created', documentData.createdAt];
        
        // Add sections as rows
        if (documentData.sections) {
          sheet.data[5] = [];
          sheet.data[6] = ['Sections'];
          
          let rowIndex = 7;
          for (const section of documentData.sections) {
            sheet.data[rowIndex] = [section.title || section.section_title || ''];
            rowIndex++;
          }
        }
      }
      
      // Generate the spreadsheet
      const outputPath = path.join(this.outputDir, `${outputFilename}.xlsx`);
      
      return new Promise((resolve, reject) => {
        const out = require('fs').createWriteStream(outputPath);
        
        out.on('error', reject);
        
        xlsx.generate(out, {
          finalize: async (written) => {
            console.log(`Spreadsheet created: ${written} bytes`);
            resolve({
              success: true,
              path: outputPath,
              filename: `${outputFilename}.xlsx`,
              format: 'xlsx',
              size: written
            });
          },
          error: reject
        });
      });
    } catch (error) {
      console.error('Error converting to Excel:', error);
      throw error;
    }
  }

  generateHTML(documentData) {
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${documentData.title || 'Document'}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
    h2 { color: #34495e; margin-top: 30px; }
    h3 { color: #7f8c8d; }
    .metadata { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 30px; }
    .section { margin-bottom: 30px; }
    .subsection { margin-left: 20px; margin-top: 20px; }
    p { margin: 10px 0; }
    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>${documentData.title || `${documentData.client} - ${documentData.projectName}`}</h1>
  
  <div class="metadata">
    <p><strong>Type:</strong> ${documentData.type}</p>
    <p><strong>Client:</strong> ${documentData.client}</p>
    <p><strong>Project:</strong> ${documentData.projectName}</p>
    <p><strong>Author:</strong> ${documentData.author || 'HABA Consulting'}</p>
    <p><strong>Created:</strong> ${documentData.createdAt}</p>
  </div>
`;

    if (documentData.sections && Array.isArray(documentData.sections)) {
      for (const section of documentData.sections) {
        html += `
  <div class="section">
    <h2>${section.title || section.section_title || 'Section'}</h2>
`;
        
        if (section.content) {
          const content = Array.isArray(section.content) ? section.content : [section.content];
          for (const paragraph of content) {
            html += `    <p>${String(paragraph)}</p>\n`;
          }
        }
        
        if (section.subsections) {
          for (const subsection of section.subsections) {
            html += `
    <div class="subsection">
      <h3>${subsection.title}</h3>
`;
            if (subsection.content) {
              const subContent = Array.isArray(subsection.content) ? subsection.content : [subsection.content];
              for (const paragraph of subContent) {
                html += `      <p>${String(paragraph)}</p>\n`;
              }
            }
            html += `    </div>\n`;
          }
        }
        
        html += `  </div>\n`;
      }
    } else if (documentData.content) {
      html += `
  <div class="section">
    <pre>${JSON.stringify(documentData.content, null, 2)}</pre>
  </div>
`;
    }

    html += `
</body>
</html>`;

    return html;
  }

  async convertDocument(documentData, format, outputFilename) {
    const converters = {
      'pdf': this.convertToPDF.bind(this),
      'docx': this.convertToWord.bind(this),
      'word': this.convertToWord.bind(this),
      'pptx': this.convertToPowerPoint.bind(this),
      'powerpoint': this.convertToPowerPoint.bind(this),
      'xlsx': this.convertToExcel.bind(this),
      'excel': this.convertToExcel.bind(this)
    };

    const converter = converters[format.toLowerCase()];
    if (!converter) {
      throw new Error(`Unsupported format: ${format}`);
    }

    return await converter(documentData, outputFilename);
  }
}

module.exports = DocumentConverterService;