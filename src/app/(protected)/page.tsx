"use client";
import { useEffect, useState } from "react";
// Components
import { MyClient } from "../../components/profile/client";
import { AlertLoading } from "../../components/loading/verifySession";
import { useAuthContext } from "../../context/AuthContext";
// Services
import { getUserProfile, UserProfile } from "../../services/profile";
import { MyEmployer } from "../../components/profile/employer";
import { Gender, JobPositions } from "../../types/types";
import { getGenders } from "../../services/gender";
import { getJobPositions } from "../../services/jobPosition";

export default function Home() {
  const { loading } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [roles, setRoles] = useState<Gender[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };

    const fetchGenders = async () => {
      try {
          const data: Gender[] = await getGenders();
          setGenders(data);
      } catch (error) {
          console.error("Error al obtener los géneros", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const data: JobPositions[] = await getJobPositions();
        setRoles(data);
      } catch (error) {
        console.error('Error al obtener los roles de trabajo', error);
      }
    };

    fetchProfile();
    fetchGenders();
    fetchRoles();
  }, []);

  if (loading) {
    return (
        <AlertLoading textInformation="Verificando sesión..." />
    );
  }

  if (!profile) {
    return <AlertLoading textInformation="Cargando perfil..." />
  }

  return (
    <section className="containerPage">
      {profile?.role === "client"
        ? <MyClient profile={profile} genders={genders} />
        : <MyEmployer profile={profile} genders={genders} roles={roles} />
      }
    </section>
  );
}
