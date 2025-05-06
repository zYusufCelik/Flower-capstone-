import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Border,
} from "docx";
import { saveAs } from "file-saver";
import {
  delayIconBase64,
  operationIconBase64,
  transportationIconBase64,
  inspectionIconBase64,
  storageIconBase64,
} from "../../constants/iconBase64";

const Summary = ({ summary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //PDF OLUŞTURMA
  const handleDownloadPDF = () => {
    if (!summary) {
      alert("Summary is missing!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Summary Report", 10, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Process Name: ${summary.processName || "N/A"}`, 10, 30);

    doc.text("General Information:", 10, 40);
    doc.line(10, 42, 200, 42);

    let infoY = 50;

    doc.text(`Total Time: ${summary.totalTime} min`, 10, infoY);
    doc.text(`Total Distance: ${summary.totalDistance} m`, 10, infoY + 10);
    doc.text(
      `Value Added: ${summary.valueAddedCount} (${summary.valueAddedPercentage}%)`,
      10,
      infoY + 20
    );
    doc.text(
      `Non-Value Added: ${summary.nonValueAddedCount} (${summary.nonValueAddedPercentage}%)`,
      10,
      infoY + 30
    );

    summary.shapes.forEach((shape, index) => {
      doc.text(
        `${shape.name} (${shape.shape}): ${shape.count} step(s) - ${shape.percentage}%`,
        10,
        infoY + 40 + index * 10
      );
    });

    const stepsStartY = infoY + 50 + summary.shapes.length * 10;
    doc.text("Steps of the Process:", 10, stepsStartY);
    doc.line(10, stepsStartY + 2, 200, stepsStartY + 2);

    let rowY = stepsStartY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Step Name", 10, rowY);
    doc.text("Shape", 60, rowY);
    doc.text("Duration/Distance", 120, rowY);
    doc.text("Value Type", 200, rowY, { align: "right" });
    doc.line(10, rowY + 2, 200, rowY + 2);
    doc.setFont("helvetica", "normal");

    rowY += 8;

    summary.steps.forEach((step) => {
      const { stepName, shape, distance, time, valueType } = step;

      const shapeNameMap = {
        circle: "Operation",
        square: "Inspection",
        arrow: "Transportation",
        triangle: "Storage",
        D: "Delay",
        half: "Delay",
      };

      const shapeLabel = `${shapeNameMap[shape] || "Unknown"}${
        shape ? ` (${shape})` : ""
      }`;
      const durationOrDistance =
        distance != null ? `${distance} m` : `${time} sec`;

      const wrappedName = doc.splitTextToSize(step.stepName, 45);
      doc.text(wrappedName, 10, rowY);

      const iconY = rowY - 4;

      if (shape === "D" || shape === "half") {
        doc.addImage(delayIconBase64, "PNG", 60, iconY, 8, 8);
      } else if (shape === "circle") {
        doc.addImage(operationIconBase64, "PNG", 60, iconY, 8, 8);
      } else if (shape === "arrow") {
        doc.addImage(transportationIconBase64, "PNG", 60, iconY, 8, 8);
      } else if (shape === "square") {
        doc.addImage(inspectionIconBase64, "PNG", 60, iconY, 8, 8);
      } else if (shape === "triangle") {
        doc.addImage(storageIconBase64, "PNG", 60, iconY, 8, 8);
      } else {
        doc.text(shapeLabel, 60, rowY);
      }

      doc.text(durationOrDistance, 120, rowY);
      doc.text(valueType, 200, rowY, { align: "right" });

      rowY += wrappedName.length * 7;
    });

    doc.save("summary.pdf");
    setIsModalOpen(false);
  };

  // DOCX OLUŞTURMA
  const handleDownloadDOCX = () => {
    if (!summary) {
      alert("Summary is missing!");
      return;
    }

    const shapeNameMap = {
      circle: "Operation",
      square: "Inspection",
      arrow: "Transportation",
      triangle: "Storage",
      D: "Delay",
      half: "Delay",
    };

    const doc = new Document({
      sections: [
        {
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: "Summary Report",
                  bold: true,
                  size: 32,
                }),
              ],
              alignment: "center",
              spacing: { after: 300 },
            }),

            // Process Name
            new Paragraph({
              children: [
                new TextRun({
                  text: `Process Name: ${summary.processName || "N/A"}`,
                  bold: true,
                }),
              ],
              spacing: { after: 200 },
            }),

            // General Information
            new Paragraph({
              text: "General Information:",
              bold: true,
              spacing: { after: 100 },
            }),
            new Paragraph(`Total Time: ${summary.totalTime} min`),
            new Paragraph(`Total Distance: ${summary.totalDistance} m`),
            new Paragraph(
              `Value Added: ${summary.valueAddedCount} (${summary.valueAddedPercentage}%)`
            ),
            new Paragraph(
              `Non-Value Added: ${summary.nonValueAddedCount} (${summary.nonValueAddedPercentage}%)`
            ),

            // Shapes Summary (General Info içindeymiş gibi)
            ...summary.shapes.map(
              (shape) =>
                new Paragraph(
                  `${shape.name} (${shape.shape}): ${shape.count} step(s) - ${shape.percentage}%`
                )
            ),

            new Paragraph({ text: "", spacing: { before: 300, after: 100 } }),

            // Steps of the Process
            new Paragraph({
              text: "Steps of the Process:",
              bold: true,
              spacing: { after: 200 },
            }),

            // Table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                // Header Row
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({ text: "Step Name", bold: true }),
                      ],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Shape", bold: true })],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: "Duration/Distance",
                          bold: true,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ text: "Value Type", bold: true }),
                      ],
                    }),
                  ],
                }),

                // Data Rows
                ...summary.steps.map(
                  (step) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph(step.stepName)],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(
                              `${shapeNameMap[step.shape] || "Unknown"} (${
                                step.shape
                              })`
                            ),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(
                              step.distance != null
                                ? `${step.distance} m`
                                : `${step.time} sec`
                            ),
                          ],
                        }),
                        new TableCell({
                          children: [new Paragraph(step.valueType)],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "summary.docx");
      setIsModalOpen(false);
    });
  };

  return (
    <div className="space-y-6 w-full max-w-xl relative">
      {/* Summary Info */}
      <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded border">
        <div>
          <strong>Total Time:</strong> {summary.totalTime} min
        </div>
        <div>
          <strong>Total Distance:</strong> {summary.totalDistance} m
        </div>
        <div>
          <strong>Value Added:</strong> {summary.valueAddedCount} (
          {summary.valueAddedPercentage}%)
        </div>
        <div>
          <strong>Non-Value Added:</strong> {summary.nonValueAddedCount} (
          {summary.nonValueAddedPercentage}%)
        </div>
      </div>

      {/* Shapes Summary */}
      <div>
        <h3 className="text-md font-semibold mb-2">Shapes Summary</h3>
        <div className="space-y-2">
          {summary.shapes.map((shape, idx) => (
            <div
              key={idx}
              className="flex justify-between text-sm bg-white p-2 border rounded shadow-sm"
            >
              <span>
                <strong>{shape.name}</strong> ({shape.shape})
              </span>
              <span>
                {shape.count} step(s) - {shape.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Button with Popup Below */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Download Summary
        </button>

        {isModalOpen && (
          <div className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50 w-64">
            <h3 className="text-md font-bold mb-4 text-center">
              Choose File Format
            </h3>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                PDF
              </button>
              <button
                onClick={handleDownloadDOCX}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                DOCX
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 mt-4 block mx-auto"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
