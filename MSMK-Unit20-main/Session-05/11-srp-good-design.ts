/**
 * Single Responsibility Principle APLICATION EXAMPLE 
 * 
 * Each component now has a single reason to change.
 */


// 1. Responsibility: Generating the raw report content
class ReportContentGenerator {
    public generate(data: any): string {
        // Logic to process data and create the text of the report
        let content = 
          `Report Date: ${new Date().toLocaleDateString()}\n` +
          `Data: ${JSON.stringify(data)}\n`;
        return content;
    }
}

// 2. Responsibility: Formatting the report
interface IReportFormatter {
    format(rawContent: string): string;
}

class PrintFormatter implements IReportFormatter {
    public format(rawContent: string): string {
        return `--- PRINTABLE REPORT ---\n${rawContent}\n--- END PRINTABLE REPORT ---`;
    }
}

class HtmlFormatter implements IReportFormatter {
    public format(rawContent: string): string {
        return `<html><body><h1>Report</h1><p>${rawContent.replace(/\n/g, '<br>')}</p></body></html>`;
    }
}

// 3. Responsibility: Sending the report
interface IReportSender {
    send(destination: string, content: string): boolean;
}

class EmailSender implements IReportSender {
    public send(emailAddress: string, content: string): boolean {
        if (!emailAddress.includes('@')) {
            console.error("Error: Invalid email address for email sender.");
            return false;
        }
        console.log(`Sending via email to ${emailAddress}...`);
        // Simulate email sending
        return true;
    }
}

class SMSSender implements IReportSender {
    public send(phoneNumber: string, content: string): boolean {
        if (phoneNumber.length < 9) { // Simple validation
            console.error("Error: Invalid phone number for SMS sender.");
            return false;
        }
        console.log(`Sending via SMS to ${phoneNumber}...`);
        // Simulate SMS sending
        return true;
    }
}

// 4. Responsibility: Persisting the report
interface IReportRepository {
    save(reportData: string): boolean;
}

class DatabaseReportRepository implements IReportRepository {
    public save(reportData: string): boolean {
        console.log("Saving report to database...");
        // Simulate database save
        return true;
    }
}

class FileSystemReportRepository implements IReportRepository {
    public save(reportData: string): boolean {
        console.log("Saving report to file system...");
        // Simulate file system save
        return true;
    }
}

// 5. Orchestrator/Service: Coordinates the other single-responsibility components
class ReportService {
    private contentGenerator: ReportContentGenerator;
    private formatter: IReportFormatter;
    private sender: IReportSender;
    private repository: IReportRepository;

    constructor(
        contentGenerator: ReportContentGenerator,
        formatter: IReportFormatter,
        sender: IReportSender,
        repository: IReportRepository
    ) {
        this.contentGenerator = contentGenerator;
        this.formatter = formatter;
        this.sender = sender;
        this.repository = repository;
    }

    public processAndDistributeReport(data: any, distributionTarget: string): void {
        const rawContent = this.contentGenerator.generate(data);
        const formattedContent = this.formatter.format(rawContent);
        
        this.sender.send(distributionTarget, formattedContent);
        this.repository.save(rawContent);
    }
}

// --- Usage of the SRP-compliant system ---
console.log("\n--- SRP-Compliant Report System ---");

const userDataGood = { id: 202, name: "Jane Smith", metrics: { sales: 1500, expenses: 800 } };

// Setup for a printable report, sent via email, saved to DB
const generator = new ReportContentGenerator();
const printFormatter = new PrintFormatter();
const emailSender = new EmailSender();
const dbRepository = new DatabaseReportRepository();

const reportService1 = new ReportService(
    generator,
    printFormatter,
    emailSender,
    dbRepository
);
reportService1.processAndDistributeReport(userDataGood, "jane.smith@example.com");

console.log("\n--- Changing behavior without modifying existing classes ---");

// Setup for an HTML report, sent via SMS, saved to File System
const htmlFormatter = new HtmlFormatter();
const smsSender = new SMSSender();
const fsRepository = new FileSystemReportRepository();

const reportService2 = new ReportService(
    generator,           // Same content generator
    htmlFormatter,       // NEW formatter
    smsSender,           // NEW sender
    fsRepository         // NEW repository
);
reportService2.processAndDistributeReport(userDataGood, "5551234567");
