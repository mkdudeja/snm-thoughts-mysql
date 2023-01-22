// Import stylesheets
import './style.css';
import THOUGHTS from './thoughts.json';

const $date = new Date('2023-02-05');
const $title = document.getElementById('title');
const $mysql = document.getElementById('mysql');

function parseDate(date) {
  return date.toISOString().split('T')[0];
}

function escapeThought(str) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

const scriptBody = THOUGHTS.map((item) => {
  const fromDate = parseDate($date);
  $date.setDate($date.getDate() + 1);
  const toDate = parseDate($date);

  return `('Baba Jee', '${escapeThought(
    item
  )}', '${fromDate}', 1, '${toDate}')`;
});

const mysqlScript = `
INSERT INTO \`wp_snmkids_quote_content\` (\`author\`, \`quote\`, \`start_date\`, \`status\`, \`end_date\`) VALUES
${scriptBody.join(',\r\n')}
`;

// Write Javascript code!
$title.innerHTML = `SNM Thoughts`;
$mysql.innerHTML = mysqlScript;
console.log(mysqlScript);
