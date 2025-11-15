import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [pendingTips, setPendingTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingTips();
  }, []);

  const loadPendingTips = async () => {
    try {
      const response = await api.get('/tips/pending');
      setPendingTips(response.data);
    } catch (error) {
      console.error('Error loading tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const moderateTip = async (tipId, decision, reason = '') => {
    try {
      await api.post(`/tips/${tipId}/moderate`, { decision, reason });
      setPendingTips(pendingTips.filter((tip) => tip.id !== tipId));
    } catch (error) {
      console.error('Error moderating tip:', error);
      alert('Failed to moderate tip');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>CrewLayover Admin</h1>
        <div className="user-info">
          <span>Welcome, {user.full_name}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <h2>Pending Tips Moderation ({pendingTips.length})</h2>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : pendingTips.length === 0 ? (
          <div className="empty-state">No pending tips to moderate</div>
        ) : (
          <div className="tips-grid">
            {pendingTips.map((tip) => (
              <div key={tip.id} className="tip-card">
                <div className="tip-header">
                  <span className="tip-id">Tip #{tip.id}</span>
                  <span className="tip-status">{tip.status}</span>
                </div>

                {tip.title && <h3>{tip.title}</h3>}

                <p className="tip-content">{tip.content}</p>

                {tip.category && (
                  <span className="tip-category">{tip.category}</span>
                )}

                <div className="tip-meta">
                  <span>User ID: {tip.user_id}</span>
                  <span>Destination ID: {tip.destination_id}</span>
                </div>

                <div className="tip-actions">
                  <button
                    className="approve-btn"
                    onClick={() => moderateTip(tip.id, 'approved')}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => {
                      const reason = prompt('Rejection reason (optional):');
                      moderateTip(tip.id, 'rejected', reason || '');
                    }}
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
