/**
 * CONFIGURABLE — systems we connect to (gap 7, /integrations hub).
 * support:
 *   "standard" — via the vendor's standard interfaces, delivered in projects today
 *   "packaged" — reusable, pre-built connector
 *   "pilot"    — packaged connector in pilot
 */
import type { L10n } from "@/i18n/config";

export type IntegrationSystem = { name: string; support: "standard" | "packaged" | "pilot"; how: string };
export type IntegrationGroup = { id: string; title: L10n; summary: L10n; systems: IntegrationSystem[] };

export const integrationGroups: IntegrationGroup[] = [
  {
    id: "erp",
    title: { en: "ERP", ar: "أنظمة ERP" },
    summary: { en: "Read orders and master data; write back approved decisions.", ar: "قراءة الطلبيات والبيانات الرئيسية؛ وإعادة كتابة القرارات المعتمدة." },
    systems: [
      { name: "SAP S/4HANA", support: "standard", how: "OData · BAPI/RFC · IDoc" },
      { name: "SAP ECC", support: "standard", how: "BAPI/RFC · IDoc" },
      { name: "Oracle Fusion / EBS", support: "standard", how: "REST · DB views" },
      { name: "Microsoft Dynamics 365", support: "pilot", how: "Dataverse Web API" },
      { name: "Odoo", support: "pilot", how: "JSON-RPC / XML-RPC" },
    ],
  },
  {
    id: "ot",
    title: { en: "Shop floor (MES / SCADA / PLC)", ar: "أرض المصنع (MES / SCADA / PLC)" },
    summary: { en: "Read-only by default; segmented networks where required.", ar: "قراءة فقط افتراضياً؛ وشبكات مجزأة عند الحاجة." },
    systems: [
      { name: "OPC UA", support: "standard", how: "Gateway" },
      { name: "Modbus", support: "standard", how: "Gateway" },
      { name: "MQTT", support: "standard", how: "Broker" },
      { name: "Siemens Opcenter / S7", support: "standard", how: "OPC UA · APIs" },
      { name: "Rockwell / FactoryTalk", support: "standard", how: "OPC UA · APIs" },
    ],
  },
  {
    id: "ai",
    title: { en: "AI platforms & agents", ar: "منصات ووكلاء الذكاء الاصطناعي" },
    summary: { en: "Feed vendor AI agents the clean data they need.", ar: "زوّد وكلاء الذكاء الاصطناعي لدى الموردين بالبيانات النظيفة التي يحتاجونها." },
    systems: [
      { name: "SAP Joule", support: "standard", how: "SAP BTP" },
      { name: "Siemens Industrial Copilot", support: "standard", how: "Data layer" },
      { name: "Kinaxis / o9 / Blue Yonder", support: "standard", how: "Data feeds" },
    ],
  },
  {
    id: "cloud",
    title: { en: "Cloud & data", ar: "السحابة والبيانات" },
    summary: { en: "Where your data layer runs.", ar: "حيث تعمل طبقة البيانات لديك." },
    systems: [
      { name: "Microsoft Azure", support: "standard", how: "Data Factory · Fabric" },
      { name: "AWS", support: "standard", how: "Glue · S3" },
      { name: "PostgreSQL / SQL Server", support: "standard", how: "CDC · views" },
      { name: "Excel / CSV", support: "standard", how: "Scheduled import" },
    ],
  },
];
