/**
 * TimeGangster - Get current time
 */
export async function main() {
    try {
        // Get current time
        const date = new Date();
        console.log('Current time:', date.toLocaleString());
        console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
//# sourceMappingURL=index.js.map