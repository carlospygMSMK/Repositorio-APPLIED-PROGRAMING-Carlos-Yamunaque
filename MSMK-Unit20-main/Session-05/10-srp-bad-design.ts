/**
 * Single Responsibility Principle VIOLATION EXAMPLE 
 * 
 * This class has multiple reasons to change, violating SRP.
 */


class BadReportGenerator {
    private reportContent: string;

    constructor(data: any) {
        this.reportContent = this.generateRawContent(data);
    }

    private generateRawContent(data: any): string {
        // Logic to process data and create the text of the report
        let content = 
          `Report Date: ${new Date().toLocaleDateString()}\n` +
          `Data: ${JSON.stringify(data)}\n`;
        
        return content;
    }

    public formatForPrinting(): string {
        // Logic specific to formatting for a printer or screen display
        return `--- REPORT START ---\n${this.reportContent}\n--- REPORT END ---`;
    }

    public sendViaEmail(recipient: string): boolean {
        // Logic for sending the report via email (e.g., interacting with an email service)
        if (!recipient.includes('@')) {
            console.error("Error: Invalid email address.");
            return false;
        }
        console.log(`Sending report via email to ${recipient}...`);
        // Simulate email sending
        return true;
    }

    public saveToDatabase(): boolean {
        // Logic for persisting the report in a database
        console.log("Saving report to database...");
        // Simulate database save operation
        return true;
    }
}

// --- Usage of the badly designed class ---
console.log("--- Badly Designed Report System ---");
const userData = { id: 101, name: "John Doe", items: ["Item A", "Item B"] };
const badReport = new BadReportGenerator(userData);

console.log("\nFormatted Report (Bad Design):");
console.log(badReport.formatForPrinting());

badReport.sendViaEmail("john.doe@example.com");
badReport.saveToDatabase();

/*
Reasons why BadReportGenerator violates SRP:
1.  If the logic for *generating* the report's raw content changes, this class changes.
2.  If the logic for *formatting* the report for printing changes, this class changes.
3.  If the logic for *sending emails* (e.g., switching email providers, changing email templates) changes, this class changes.
4.  If the logic for *saving to the database* (e.g., changing database schema, switching ORMs) changes, this class changes.

Each of these is a separate "reason to change," meaning the class has multiple responsibilities.
*/
