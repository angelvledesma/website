
const commitLog = document.getElementById("commitLog");
const cutoffDate = new Date("2025-07-08T23:59:59-05:00");

fetch(`https://api.github.com/repos/angelvledesma/portfolioTemp/commits`)

    .then(response => response.json())
    .then(commits => {
        let html = "<ul>";


        const filteredCommits = commits.filter(commit => {
            const commitDate = new Date(commit.commit.author.date);
            return commitDate > cutoffDate;
        });

        filteredCommits.slice(0, 15).forEach(commit => {
            const commitDate = new Date(commit.commit.author.date);
            const options = {
                timeZone: 'America/Chicago',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            const formatter = new Intl.DateTimeFormat('en-US', options);
            const formattedDate = formatter.format(commitDate);

            const message = commit.commit.message;
            html += `<strong style="color: black;">${formattedDate} CST :</strong> <span style="color: black;">${message}</span><br>`;
        });
        html += "</ul>";
        commitLog.innerHTML = html;
    })

    .catch(error => {
        commitLog.innerHTML = "Failed to load updates.";
        console.error(error);
    });