export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = 'aolagunju-cre';
  const repo = 'calgary-office-advisors';
  const filePath = 'data/subscribers.json';

  if (!token) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  try {
    // Fetch current subscribers
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    let subscribers = [];
    let sha = null;

    if (getRes.status === 200) {
      const data = await getRes.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      subscribers = JSON.parse(content);
      sha = data.sha;
    } else if (getRes.status !== 404) {
      return res.status(500).json({ error: 'Failed to fetch subscribers file' });
    }

    // Check if email already subscribed
    if (subscribers.some((s) => s.email === email)) {
      return res.status(200).json({ message: 'Already subscribed', subscribed: true });
    }

    // Add new subscriber
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      source: 'guides-page',
    });

    const newContent = Buffer.from(JSON.stringify(subscribers, null, 2)).toString('base64');

    const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const putBody = {
      message: 'Add new email subscriber from guides page',
      content: newContent,
      ...(sha ? { sha } : {}),
    };

    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify(putBody),
    });

    if (putRes.status !== 200 && putRes.status !== 201) {
      const err = await putRes.text();
      return res.status(500).json({ error: `GitHub API error: ${err}` });
    }

    return res.status(200).json({ message: 'Subscribed successfully', subscribed: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
