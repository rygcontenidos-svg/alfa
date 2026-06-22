"use client";

import type { Ejercicio } from "@/lib/tipos";
import SeleccionMultiple from "./ejercicios/SeleccionMultiple";
import VerdaderoFalso from "./ejercicios/VerdaderoFalso";
import CircuitoComunicacion from "./ejercicios/CircuitoComunicacion";
import TildacionGeneral from "./ejercicios/TildacionGeneral";
import TildacionDiacritica from "./ejercicios/TildacionDiacritica";
import TildacionSilabas from "./ejercicios/TildacionSilabas";
import NormativaGrafica from "./ejercicios/NormativaGrafica";
import TiemposVerbales from "./ejercicios/TiemposVerbales";
import ParafasisSinonimosElision from "./ejercicios/ParafasisSinonimosElision";
import MarcoNarrativo from "./ejercicios/MarcoNarrativo";
import TipoNarrador from "./ejercicios/TipoNarrador";
import TipoTextual from "./ejercicios/TipoTextual";
import OrdenarSecuencia from "./ejercicios/OrdenarSecuencia";
import CoherenciaCohesion from "./ejercicios/CoherenciaCohesion";
import ReescrituraNormativa from "./ejercicios/ReescrituraNormativa";
import Completar from "./ejercicios/Completar";
import CompletarCuadro from "./ejercicios/CompletarCuadro";
import UnirFlechas from "./ejercicios/UnirFlechas";
import RectaNumerica from "./ejercicios/RectaNumerica";

export default function EjercicioRouter({
  ej,
  moduloId,
}: {
  ej: Ejercicio;
  moduloId: string;
}) {
  switch (ej.tipo) {
    case "seleccion_multiple":
      return <SeleccionMultiple ej={ej} moduloId={moduloId} />;
    case "verdadero_falso":
      return <VerdaderoFalso ej={ej} moduloId={moduloId} />;
    case "circuito_comunicacion":
      return <CircuitoComunicacion ej={ej} moduloId={moduloId} />;
    case "tildacion_general":
      return <TildacionGeneral ej={ej} moduloId={moduloId} />;
    case "tildacion_diacritica":
      return <TildacionDiacritica ej={ej} moduloId={moduloId} />;
    case "tildacion_silabas":
      return <TildacionSilabas ej={ej} moduloId={moduloId} />;
    case "normativa_grafica":
      return <NormativaGrafica ej={ej} moduloId={moduloId} />;
    case "tiempos_verbales":
      return <TiemposVerbales ej={ej} moduloId={moduloId} />;
    case "parafasis_sinonimos_elision":
      return <ParafasisSinonimosElision ej={ej} moduloId={moduloId} />;
    case "marco_narrativo":
      return <MarcoNarrativo ej={ej} moduloId={moduloId} />;
    case "tipo_narrador":
      return <TipoNarrador ej={ej} moduloId={moduloId} />;
    case "tipo_textual":
      return <TipoTextual ej={ej} moduloId={moduloId} />;
    case "ordenar_secuencia":
      return <OrdenarSecuencia ej={ej} moduloId={moduloId} />;
    case "coherencia_cohesion":
      return <CoherenciaCohesion ej={ej} moduloId={moduloId} />;
    case "reescritura_normativa":
      return <ReescrituraNormativa ej={ej} moduloId={moduloId} />;
    case "completar":
      return <Completar ej={ej} moduloId={moduloId} />;
    case "completar_cuadro":
      return <CompletarCuadro ej={ej} moduloId={moduloId} />;
    case "unir_flechas":
      return <UnirFlechas ej={ej} moduloId={moduloId} />;
    case "recta_numerica":
      return <RectaNumerica ej={ej} moduloId={moduloId} />;
    default:
      return null;
  }
}
