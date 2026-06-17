const input = document.getElementById('username-input');
const resultCard = document.getElementById('result-card');
const statusMessage = document.getElementById('status-message');
const profileLink = document.getElementById('profile-link');

const DEBOUNCE_MS = 500;
let debounceTimer;
let lastRequestId = 0;

/**
 * Validate GitHub username format.
 * Rules: a-z, 0-9, hyphen; 1-39 chars; no leading/trailing hyphen.
 */
function validateUsername(username) {
  const trimmed = username.trim().toLowerCase();

  if (!trimmed) {
    return { valid: false, reason: 'empty', normalized: '' };
  }

  const allowedPattern = /^[a-z0-9-]{1,39}$/;
  const hasValidEdges = !trimmed.startsWith('-') && !trimmed.endsWith('-');

  if (!allowedPattern.test(trimmed) || !hasValidEdges) {
    return {
      valid: false,
      reason: 'invalid',
      normalized: trimmed,
      message:
        'Only a-z, 0-9, hyphen; cannot start/end with hyphen; 1-39 chars'
    };
  }

  return { valid: true, normalized: trimmed };
}

/**
 * Query GitHub users endpoint and map status codes to app states.
 */
async function checkGitHub(username) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (response.status === 404) {
      return { state: 'available', message: '✅ Available' };
    }

    if (response.status === 200) {
      return { state: 'taken', message: '❌ Taken' };
    }

    if (response.status === 403 || response.status === 429) {
      return {
        state: 'rate-limited',
        message: 'Rate limited by GitHub API. Please try again shortly.'
      };
    }

    return {
      state: 'error',
      message: `Unexpected response from GitHub (${response.status}).`
    };
  } catch {
    return {
      state: 'error',
      message: 'Network error. Please check your connection and try again.'
    };
  }
}

/**
 * Render all visual states in one place.
 */
function renderState(state, message, username = '') {
  resultCard.className = `result-card state-${state}`;
  statusMessage.textContent = message;

  if (username && state !== 'invalid' && state !== 'idle') {
    const profileUrl = `https://github.com/${username}`;
    profileLink.href = profileUrl;
    profileLink.textContent = profileUrl;
    profileLink.hidden = false;
  } else {
    profileLink.hidden = true;
    profileLink.removeAttribute('href');
    profileLink.textContent = '';
  }
}

async function handleInput() {
  const requestId = ++lastRequestId;
  const validation = validateUsername(input.value);

  if (validation.reason === 'empty') {
    renderState('idle', 'Type a username…');
    return;
  }

  if (!validation.valid) {
    renderState('invalid', validation.message || 'Invalid username format.');
    return;
  }

  renderState('loading', 'Checking…', validation.normalized);
  const result = await checkGitHub(validation.normalized);

  // Prevent outdated requests from overriding latest UI state.
  if (requestId !== lastRequestId) return;

  renderState(result.state, result.message, validation.normalized);
}

input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(handleInput, DEBOUNCE_MS);
});

renderState('idle', 'Type a username…');
