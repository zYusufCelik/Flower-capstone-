import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from "docx";
import { saveAs } from "file-saver";

export const exportToWord = (summaryStats, shapeData) => {
    const doc = new Document();

    const title = new Paragraph({
        children: [
            new TextRun({
                text: "Process Summary Report",
                bold: true,
                size: 28,
            }),
        ],
        spacing: { after: 300 },
    });

    const summaryParagraphs = Object.entries(summaryStats).map(([key, value]) =>
        new Paragraph({
            children: [
                new TextRun({ text: `${key.replace(/([A-Z])/g, " $1").toUpperCase()}: `, bold: true }),
                new TextRun({ text: value.toString() }),
            ],
        })
    );

    const tableRows = [
        new TableRow({
            children: ["Process", "Count", "Percentage"].map(header =>
                new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: header, bold: true })] })],
                })
            ),
        }),
        ...shapeData.map(row =>
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph(row.process)] }),
                    new TableCell({ children: [new Paragraph(row.count.toString())] }),
                    new TableCell({ children: [new Paragraph(`${row.percentage}%`)] }),
                ],
            })
        ),
    ];

    const table = new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
    });

    doc.addSection({ children: [title, ...summaryParagraphs, new Paragraph({}), table] });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "process-summary.docx");
    });
};
