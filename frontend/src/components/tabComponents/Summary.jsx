import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const Summary = ({ summary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🟢 PDF OLUŞTURMA
  const handleDownloadPDF = () => {
    if (!summary) {
      alert("Summary is missing!");
      return;
    }

    const doc = new jsPDF();

    // Başlık
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Summary Report", 10, 20);

    // General Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("General Information:", 10, 35);
    doc.line(10, 37, 200, 37);

    doc.text(`Total Time: ${summary.totalTime} min`, 10, 45);
    doc.text(`Total Distance: ${summary.totalDistance} m`, 10, 55);
    doc.text(
      `Value Added: ${summary.valueAddedCount} (${summary.valueAddedPercentage}%)`,
      10,
      65
    );
    doc.text(
      `Non-Value Added: ${summary.nonValueAddedCount} (${summary.nonValueAddedPercentage}%)`,
      10,
      75
    );

    // Shapes Summary
    doc.text("Shapes Summary:", 10, 90);
    doc.line(10, 92, 200, 92);

    summary.shapes.forEach((shape, index) => {
      doc.text(
        `• ${shape.name} (${shape.shape}): ${shape.count} step(s) - ${shape.percentage}%`,
        15,
        100 + index * 10
      );
    });

    doc.save("summary.pdf");
    setIsModalOpen(false);
  };

  // 🟣 DOCX OLUŞTURMA
  const handleDownloadDOCX = () => {
    if (!summary) {
      alert("Summary is missing!");
      return;
    }

    const doc = new Document({
      sections: [
        {
          children: [
            // Başlık
            new Paragraph({
              children: [
                new TextRun({
                  text: "Summary Report",
                  bold: true,
                  size: 32, // 16pt
                }),
              ],
              alignment: "center",
              spacing: { after: 300 },
            }),

            // General Information
            new Paragraph({
              text: "General Information:",
              heading: "Heading2",
            }),
            new Paragraph(`Total Time: ${summary.totalTime} min`),
            new Paragraph(`Total Distance: ${summary.totalDistance} m`),
            new Paragraph(
              `Value Added: ${summary.valueAddedCount} (${summary.valueAddedPercentage}%)`
            ),
            new Paragraph(
              `Non-Value Added: ${summary.nonValueAddedCount} (${summary.nonValueAddedPercentage}%)`
            ),

            // Shapes Summary
            new Paragraph({
              text: "Shapes Summary:",
              heading: "Heading2",
              spacing: { before: 300 },
            }),

            // Shapes Bullet List
            ...summary.shapes.map(
              (shape) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${shape.name} (${shape.shape}): ${shape.count} step(s) - ${shape.percentage}%`,
                    }),
                  ],
                  bullet: { level: 0 },
                })
            ),
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
