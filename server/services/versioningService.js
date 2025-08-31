class VersioningService {
  constructor() {
    this.versions = new Map(); // In production, use a database
  }

  generateVersionNumber(documentId, changeType = 'patch') {
    const currentVersion = this.getCurrentVersion(documentId);
    const [major, minor, patch] = currentVersion.split('.').map(Number);

    switch (changeType) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
      default:
        return `${major}.${minor}.${patch + 1}`;
    }
  }

  getCurrentVersion(documentId) {
    const versions = this.versions.get(documentId);
    if (!versions || versions.length === 0) {
      return '1.0.0';
    }
    return versions[versions.length - 1].version;
  }

  addVersion(documentId, versionData) {
    if (!this.versions.has(documentId)) {
      this.versions.set(documentId, []);
    }

    const version = {
      version: versionData.version || this.generateVersionNumber(documentId, versionData.changeType),
      timestamp: new Date().toISOString(),
      author: versionData.author,
      changes: versionData.changes || [],
      documentSnapshot: versionData.documentSnapshot,
      googleDocId: versionData.googleDocId,
      changeType: versionData.changeType,
      changelog: this.generateChangelog(versionData.changes),
      approved: false,
      approvedBy: null,
      approvedAt: null
    };

    this.versions.get(documentId).push(version);
    return version;
  }

  generateChangelog(changes) {
    if (!changes || changes.length === 0) {
      return 'No specific changes documented';
    }

    const changelog = changes.map((change, index) => {
      return `${index + 1}. ${change.type}: ${change.description}`;
    }).join('\n');

    return changelog;
  }

  getVersionHistory(documentId) {
    return this.versions.get(documentId) || [];
  }

  getVersion(documentId, versionNumber) {
    const versions = this.versions.get(documentId);
    if (!versions) return null;

    return versions.find(v => v.version === versionNumber);
  }

  compareVersions(documentId, version1, version2) {
    const v1 = this.getVersion(documentId, version1);
    const v2 = this.getVersion(documentId, version2);

    if (!v1 || !v2) {
      throw new Error('One or both versions not found');
    }

    return {
      version1: v1,
      version2: v2,
      changes: this.diffVersions(v1, v2)
    };
  }

  diffVersions(v1, v2) {
    // Simple diff implementation - in production, use a proper diff library
    const changes = [];

    // Compare timestamps
    changes.push({
      type: 'metadata',
      field: 'timestamp',
      oldValue: v1.timestamp,
      newValue: v2.timestamp
    });

    // Compare content if available
    if (v1.documentSnapshot && v2.documentSnapshot) {
      const sections1 = v1.documentSnapshot.sections || {};
      const sections2 = v2.documentSnapshot.sections || {};

      // Check for added sections
      for (const section in sections2) {
        if (!sections1[section]) {
          changes.push({
            type: 'addition',
            section: section,
            content: sections2[section]
          });
        } else if (sections1[section] !== sections2[section]) {
          changes.push({
            type: 'modification',
            section: section,
            oldContent: sections1[section],
            newContent: sections2[section]
          });
        }
      }

      // Check for removed sections
      for (const section in sections1) {
        if (!sections2[section]) {
          changes.push({
            type: 'deletion',
            section: section,
            content: sections1[section]
          });
        }
      }
    }

    return changes;
  }

  approveVersion(documentId, versionNumber, approvedBy) {
    const versions = this.versions.get(documentId);
    if (!versions) {
      throw new Error('Document not found');
    }

    const version = versions.find(v => v.version === versionNumber);
    if (!version) {
      throw new Error('Version not found');
    }

    version.approved = true;
    version.approvedBy = approvedBy;
    version.approvedAt = new Date().toISOString();

    return version;
  }

  rollbackToVersion(documentId, versionNumber) {
    const version = this.getVersion(documentId, versionNumber);
    if (!version) {
      throw new Error('Version not found');
    }

    // Create a new version that's a copy of the old one
    const rollbackVersion = {
      ...version,
      version: this.generateVersionNumber(documentId, 'patch'),
      timestamp: new Date().toISOString(),
      changes: [{
        type: 'rollback',
        description: `Rolled back to version ${versionNumber}`
      }],
      changelog: `Rolled back to version ${versionNumber}`,
      approved: false,
      approvedBy: null,
      approvedAt: null
    };

    this.versions.get(documentId).push(rollbackVersion);
    return rollbackVersion;
  }

  getLatestApprovedVersion(documentId) {
    const versions = this.versions.get(documentId);
    if (!versions) return null;

    const approvedVersions = versions.filter(v => v.approved);
    if (approvedVersions.length === 0) return null;

    return approvedVersions[approvedVersions.length - 1];
  }

  searchVersions(documentId, searchCriteria) {
    const versions = this.versions.get(documentId);
    if (!versions) return [];

    return versions.filter(version => {
      if (searchCriteria.author && version.author !== searchCriteria.author) {
        return false;
      }
      if (searchCriteria.approved !== undefined && version.approved !== searchCriteria.approved) {
        return false;
      }
      if (searchCriteria.changeType && version.changeType !== searchCriteria.changeType) {
        return false;
      }
      if (searchCriteria.startDate && new Date(version.timestamp) < new Date(searchCriteria.startDate)) {
        return false;
      }
      if (searchCriteria.endDate && new Date(version.timestamp) > new Date(searchCriteria.endDate)) {
        return false;
      }
      return true;
    });
  }

  exportVersionHistory(documentId, format = 'json') {
    const versions = this.versions.get(documentId);
    if (!versions) return null;

    if (format === 'json') {
      return JSON.stringify(versions, null, 2);
    } else if (format === 'csv') {
      // Convert to CSV format
      const headers = ['Version', 'Timestamp', 'Author', 'Change Type', 'Approved', 'Changelog'];
      const rows = versions.map(v => [
        v.version,
        v.timestamp,
        v.author,
        v.changeType,
        v.approved ? 'Yes' : 'No',
        v.changelog.replace(/\n/g, ' ')
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    return versions;
  }
}

module.exports = VersioningService;