import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLeads } from "../context/LeadContext";
import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import AccountStats from "../components/profile/AccountStats";
import RecentActivity from "../components/profile/RecentActivity";
import ProfileActions from "../components/profile/ProfileActions";

/**
 * Profile page container that reads from the authenticated user and lead context.
 *
 * @returns {JSX.Element} Profile page.
 */
const Profile = memo(function Profile() {
  const navigate = useNavigate();
  const { user, isLoading, logout, updateProfile } = useAuth();
  const { leads } = useLeads();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const recentActivities = useMemo(() => {
    const safeLeads = Array.isArray(leads) ? leads : [];

    return safeLeads
      .slice()
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5)
      .map((lead, index) => {
        const leadName = lead.name || lead.company || "a lead";
        const leadCompany = lead.company ? ` for ${lead.company}` : "";
        const timestamp = lead.createdAt
          ? new Date(lead.createdAt).toLocaleString()
          : "No timestamp available";

        return {
          id: lead.id || `${lead.name || "lead"}-${index}`,
          type: "added",
          description: `Added lead ${leadName}${leadCompany}`,
          timestamp
        };
      });
  }, [leads]);

  const crmStats = useMemo(() => {
    const safeLeads = Array.isArray(leads) ? leads : [];
    const totalLeads = safeLeads.length;
    const newLeads = safeLeads.filter((lead) => lead.status && lead.status.toLowerCase() === "new").length;
    const contactedLeads = safeLeads.filter((lead) => lead.status && lead.status.toLowerCase() === "contacted").length;
    const meetingsScheduled = safeLeads.filter((lead) => lead.status && lead.status.toLowerCase() === "meeting scheduled").length;
    const proposalSent = safeLeads.filter((lead) => lead.status && lead.status.toLowerCase() === "proposal sent").length;
    const wonLeads = safeLeads.filter((lead) => lead.status && lead.status.toLowerCase() === "won").length;
    const lostLeads = safeLeads.filter((lead) => lead.status && lead.status.toLowerCase() === "lost").length;
    const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
    const totalRevenue = safeLeads.reduce((sum, lead) => sum + Number(lead.value || 0), 0);

    return {
      totalLeads,
      newLeads,
      contactedLeads,
      meetingsScheduled,
      proposalSent,
      wonLeads,
      lostLeads,
      conversionRate,
      totalRevenue: `₹${totalRevenue.toLocaleString("en-IN")}`
    };
  }, [leads]);

  const handleFieldChange = useCallback((field, value) => {
    setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!profile?.name) {
      toast.error("Full name is required");
      return;
    }

    const result = await updateProfile({ name: profile.name });
    if (result.success) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } else {
      toast.error(result.message || "Unable to update profile");
    }
  }, [profile, updateProfile]);

  const handleExport = useCallback(() => {
    const payload = JSON.stringify({ profile, stats: crmStats }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "startup-crm-profile.json";
    link.click();
    URL.revokeObjectURL(url);
  }, [crmStats, profile]);

  const handleDownloadReport = useCallback(() => {
    const report = [
      "Startup CRM Lite Activity Report",
      `User: ${profile?.name || "Unknown"}`,
      `Email: ${profile?.email || "N/A"}`,
      "",
      ...recentActivities.map((activity) => `${activity.timestamp} - ${activity.description}`)
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "activity-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  }, [profile, recentActivities]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/login");
  }, [logout, navigate]);

  if (isLoading || !profile) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <PersonalInfoCard
            profile={profile}
            isEditing={isEditing}
            onFieldChange={handleFieldChange}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
          <RecentActivity activities={recentActivities} />
        </div>

        <div className="space-y-6">
          <AccountStats stats={crmStats} />
          <ProfileActions
            onExport={handleExport}
            onDownloadReport={handleDownloadReport}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
});

export default Profile;
